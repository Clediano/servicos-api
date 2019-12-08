const Document = require('../../database/models').document;
const Transaction = require('../../database/models').transaction;

const axios = require('../../config/axios');
const FormData = require('form-data');
const fs = require('fs');

const { getAllTransactions, statisticOfTransaction, createRawTransaction } = require('../blockchain');
const { filterTransactionByHash, findTransactionByHash } = require('./functions');

async function verifyExistTransaction(hash, walletAddress) {
    const { list, error } = await getAllTransactions(walletAddress);

    if (error) return { error: 'Não foi possível buscar as transações da carteira.' }

    const listOfTransactionWithSameHash = filterTransactionByHash(list, hash);

    if (listOfTransactionWithSameHash.length > 0) {
        return listOfTransactionWithSameHash;
    }
    return null;
}

async function getExistTransaction(hash, walletAddress) {
    const { list, error } = await getAllTransactions(walletAddress);

    if (error) return { error: 'Não foi possível buscar as transações da carteira.' }

    const listOfTransactionWithSameHash = filterTransactionByHash(list, hash);

    if (listOfTransactionWithSameHash.length > 0) {
        return listOfTransactionWithSameHash[0];
    }
    return null;
}

async function findTransactionsByOrganization(req, res) {

    const { id, offset, limit } = req.params;

    const documents = await Transaction.findAndCountAll({
        include: [{
            model: Document,
            attributes: ['oidarchive'],
            where: {
                organizationid: id
            },
        }],
        order: [['createdAt', 'DESC']],
        offset,
        limit
    });
    
    if (documents) {
        return res.send(documents);
    }
    return res.status(400).send({ error: "Ocorreu um erro ao buscar os documentos." });
}

async function createDataRegisterWithHash(blockTransactionId, req, res) {

    const { organization, hash } = req.body;

    try {


        const data = await axios.get(`file/findByHash/${hash}`).catch(() => {
            res.status(400).send({ error: 'Não foi possível buscar o documento com hash: ' + hash })
        })


        const document = await Document.create({
            oidarchive: data.id,
            organizationid: organization
        });

        if (!document.id)
            res.status(400).send({ error: 'Não foi possível salvar o documento no banco de dados.' })

        const { txStats, error } = await statisticOfTransaction(blockTransactionId);

        if (error)
            res.sendStatus(400).send({ error: 'Não foi possível localizar a transação: ' + txId });

        const transaction = await Transaction.create({
            transactionid: blockTransactionId,
            height: txStats.blockHeight,
            hash: txStats.blockHash,
            confirmation: txStats.confirmations,
            size: txStats.sizeBytes,
            opreturn: txStats.opReturn,
            confirmed: false,
            documentid: document.id
        });

        const transactionWithDocument = await Transaction.findOne({
            where: { id: transaction.id }
        });

        return res.status(201).json({
            document: transactionWithDocument
        });
    } catch (error) {
        if (error.message.includes("connect ECONNREFUSED")) {
            return res.json({ error: "Erro de conexão com o servidor. Por favor, tente novamente mais tarde." });
        }
        return res.json({ error: error.message });
    }
}

async function createDataRegisterWithImage(req, res) {

    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));
    formData.append('filename', req.file.filename);
    formData.append('mimetype', req.file.mimetype);
    formData.append('size', req.file.size);

    const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}` } };

    saveImage(req, formData, config, async ({ data }) => {

        const exist = await findTransactionByHash(data.hash)

        if (exist) {
            deleteImage(data._id);
            return res.send(exist);
        }

        const { txId, error } = await createRawTransaction(data.hash, req.body.organization);

        if (error) {
            deleteImage(data._id);
            return res.status(400).json({ error })
        }

        const document = await Document.create({
            oidarchive: data._id,
            organizationid: req.body.organization
        });

        if (!document) {
            return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
        }

        const { txStats, errorStatistic } = await statisticOfTransaction(txId);

        if (errorStatistic) {
            deleteImage(data._id);
            Document.destroy({ where: { id: document.dataValues.id } })
            return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
        }

        const [transaction, created] = await Transaction.findOrCreate({
            where: {
                hash: data.hash,
            },
            defaults: {
                transaction: txStats.id,
                height: txStats.blockHeight,
                hash: data.hash,
                confirmations: txStats.confirmations,
                size: txStats.sizeBytes,
                opreturn: txStats.opReturn,
                confirmed: false,
                documentid: document.dataValues.id
            }
        });

        if (!transaction) {
            deleteImage(data._id);
            Document.destroy({ where: { id: document.dataValues.id } })
            return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
        }

        return res.status(201).send(transaction);

    }, err => {
        return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
    });

}



async function saveImage(req, formData, config, onSuccess, onError) {
    axios.post('/file', formData, config)
        .then(resp => {
            onSuccess && onSuccess(resp)
        })
        .catch(err => {
            onError && onError(err)
        })
        .finally(() => {
            fs.unlink(req.file.path, err => {
                if (err) console.error('Erro ao deletar a imagem.', err);
            });
        })
}

async function deleteImage(id, onSuccess, onError) {
    axios.delete(`/${id}`)
        .then(resp => {
            onSuccess && onSuccess(resp)
        })
        .catch(err => {
            onError && onError(err)
        })
}

module.exports = {
    createDataRegisterWithHash,
    verifyExistTransaction,
    getExistTransaction,
    findTransactionsByOrganization,
    createDataRegisterWithImage
};

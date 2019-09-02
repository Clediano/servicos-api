const Document = require('../../database/models').document;
const Transaction = require('../../database/models').transaction;
const api = require('../../config/axios');
const { getAllTransactions, statisticOfTransaction } = require('../blockchain');
const { filterTransactionByHash } = require('./functions');
const { WALLET_ADDRESS } = require('../../config/secret');

async function verifyExistTransaction(hash) {
    const { list, error } = await getAllTransactions(WALLET_ADDRESS);

    if (error) return { error: 'Não foi possível buscar as transações da carteira.' }

    const listOfTransactionWithSameHash = filterTransactionByHash(list, hash);

    if (listOfTransactionWithSameHash.length > 0) {
        return listOfTransactionWithSameHash;
    }
    return null;
}

async function getExistTransaction(hash) {
    const { list, error } = await getAllTransactions(WALLET_ADDRESS);

    if (error) return { error: 'Não foi possível buscar as transações da carteira.' }

    const listOfTransactionWithSameHash = filterTransactionByHash(list, hash);

    if (listOfTransactionWithSameHash.length > 0) {
        return listOfTransactionWithSameHash[0];
    }
    return null;
}

async function findTransactionsByOrganization(req, res) {

    const { id } = req.params;

    const documents = await Transaction.findAll({ where: { organizationid: id }, order: [['createdAt', 'DESC']] });

    if (documents) {
        res.send(documents);
    }
    res.status(400).send({ error: "Ocorreu um erro ao buscar os documentos." });
}

async function createDataRegister(blockTransactionId, req, res) {

    const { organization, hash } = req.body;

    try {

        const data = await api.get(`file/findByHash/${hash}`).catch(() => {
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
            transactionid: txStats.id,
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

module.exports = {
    createDataRegister,
    verifyExistTransaction,
    getExistTransaction,
    findTransactionsByOrganization
};

const Document = require('../../database/models').document;
const Transaction = require('../../database/models').transaction;
const api = require('../../config/axios');
const { getAllTransactions } = require('../blockchain');
const { filterTransactionByHash } = require('./functions');

async function verifyExistTransaction(hash){
    const { list, error } = await getAllTransactions();

    if(error) return { error: 'Não foi possível buscar as transações da carteira.' }

    filterTransactionByHash(list, hash);
}

async function createDataRegister(blockTransactionId, req, res) {

    const { organization, hash } = req.body;

    try {

        //const { _id } = await api.get(`file/findByHash/${hash}`);

        //if(!_id) res.sendStatus(400).send({ error: 'Não foi possível buscar o arquivo com hash: ' + hash })


       /* const document = await Document.create({
            oidArchive: _id,
            organizationId: organization
        });

        if (!document.id) res.sendStatus(400).send({ error: 'Não foi possível salvar o documento no banco de dados.' })

        const { txStats, error } = statisticOfTransaction(blockTransaction.txId);

        if (error) res.sendStatus(400).send({ error: 'Não foi possível localizar a transação: ' + txId });

        const transaction = await Transaction.create({
            transactionId: txId,
            height: txStats.blockHeight,
            hash: txStats.blockHash,
            confirmation: txStats.confirmations,
            size: txStats.sizeBytes,
            opreturn: txStats.opReturn,
            confirmed: false,
            documentId: document.id
        });

        const transactionWithDocument = await Transaction.findOne({
            where: { id: transaction.id }, include: 'documentId'
        });

        return res.json({
            document: transactionWithDocument
        });*/
    } catch (error) {
        return res.json({ error: error.message });
    }
}

module.exports = {
    createDataRegister,
    verifyExistTransaction
};

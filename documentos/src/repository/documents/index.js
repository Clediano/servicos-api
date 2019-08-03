const Document = require('../../database/models').document;
const Transaction = require('../../database/models').transaction;
const api = require('../../config/axios');
const { getAllTransactions, statisticOfTransaction } = require('../blockchain');
const { filterTransactionByHash } = require('./functions');

async function verifyExistTransaction(hash) {
    const { list, error } = await getAllTransactions();

    if (error) return { error: 'Não foi possível buscar as transações da carteira.' }

    const listOfTransactionWithSameHash = filterTransactionByHash(list, hash);

    if (listOfTransactionWithSameHash.length > 0) {
        return listOfTransactionWithSameHash;
    }
    return null;
}

async function getExistTransaction(hash) {
    const { list, error } = await getAllTransactions();

    if (error) return { error: 'Não foi possível buscar as transações da carteira.' }

    const listOfTransactionWithSameHash = filterTransactionByHash(list, hash);

    if (listOfTransactionWithSameHash.length > 0) {
        return listOfTransactionWithSameHash[0];
    }
    return null;
}

async function createDataRegister(blockTransactionId, req, res) {

    const { organization, hash } = req.body;

    try {

        const { data } = await api.get(`file/findByHash/${hash}`);

        if (!data.id)
            res.status(400).send({ error: 'Não foi possível buscar o documento com hash: ' + hash })

        const document = await Document.create({
            oidArchive: data.id,
            organizationId: organization
        });

        if (!document.id)
            res.status(400).send({ error: 'Não foi possível salvar o documento no banco de dados.' })

        const { txStats, error } = await statisticOfTransaction(blockTransactionId);

        if (error)
            res.sendStatus(400).send({ error: 'Não foi possível localizar a transação: ' + txId });

        const transaction = await Transaction.create({
            transactionId: txStats.id,
            height: txStats.blockHeight,
            hash: txStats.blockHash,
            confirmation: txStats.confirmations,
            size: txStats.sizeBytes,
            opreturn: txStats.opReturn,
            confirmed: false,
            documentId: document.id
        });

        const transactionWithDocument = await Transaction.findOne({
            where: { id: transaction.id }
        });

        return res.status(201).json({
            document: transactionWithDocument
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

module.exports = {
    createDataRegister,
    verifyExistTransaction,
    getExistTransaction
};

const Document = require('../../database/models').document;
const Transaction = require('../../database/models').transaction;
const { statisticOfTransaction } = require('../../repository/blockchain');
const { AUTH_SECRET } = require('../../config/secret');

async function createDataRegister(blockTransaction, req, res) {

    const { organization } = req.body;

    try {

        const document = await Document.create({
            oidArchive: blockTransaction.oidFile,
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
        });
    } catch (error) {
        return res.json({ error: error.message });
    }
}

async function authenticate(req, res) {
    const { } = req.body;

}

async function forgotPassword(req, res) {
    const { } = req.body;

    try {

    } catch (err) {
        res.status(400).send({ error: 'Erro ao recuperar a senha, tente novamente mais tarde.' });
    }
}

async function resetPassword(req, res) {
    const { } = req.body;

    try {

    } catch (err) {
        res.status(400).send({ error: 'Erro ao resetar a senha, tente novamente mais tarde.' });
    }
}

module.exports = {
    createDataRegister
};

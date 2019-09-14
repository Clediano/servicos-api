const cron = require('node-cron');
const Transaction = require('../../../database/models').transaction;
const { countOfConfirmation } = require('../../blockchain');

function filterTransactionByHash({ data }, hash) {
    if (data) {
        const list = data.txs.filter(element => {
            return element.outputs[0].data_string === hash;
        });
        return list;
    }
}

async function findTransactionByHash(hash) {
    return await Transaction.findOne({ where: { hash } })
}

async function saveTransactionOnly(txStats) {
    return await Transaction.create({
        transactionid: txStats.id,
        height: txStats.blockHeight,
        hash: txStats.blockHash,
        confirmation: txStats.confirmations,
        size: txStats.sizeBytes,
        opreturn: txStats.opReturn,
        confirmed: false,
        documentid: null
    });
}

// -> '0 */1 * * *' : “At minute 0 past every hour.”.
cron.schedule('0 */1 * * *', async () => {

    const transactions = await Transaction.findAll({ where: { confirmed: false }, order: [['createdAt', 'ASC']] });

    transactions && transactions.map(async transaction => {

        const numberOfConfirmations = await countOfConfirmation(transactions.transactionId);

        if (numberOfConfirmations > 6) {
            Transaction.update({ confirmations: numberOfConfirmations, confirmed: true }, { where: { id: transaction.id } });
        } else {
            Transaction.update({ confirmations: numberOfConfirmations }, { where: { id: transaction.id } });
        }
    });
});


module.exports = {
    filterTransactionByHash,
    saveTransactionOnly,
    findTransactionByHash
}
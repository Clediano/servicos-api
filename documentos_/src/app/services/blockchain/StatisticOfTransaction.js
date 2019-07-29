const { anchor } = require('../../config/anchor');

/**
 * @param {String} transactionId
 * @description ID da transação
 */
async function statisticOfTransaction(transactionId) {

    try {
        return await anchor.btcGetTxStatsAsync(transactionId);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

module.exports = statisticOfTransaction;
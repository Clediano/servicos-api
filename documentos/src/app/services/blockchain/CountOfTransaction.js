const { anchor } = require('../../config/anchor');

/**
 * @param {String} transactionId
 * @description Retorna o número de confirmações da transação
 */
async function countOfConfirmation(transactionId) {

    const { transactionId } = req.body; // the transaction id to to get the confirmation count for

    try {
        return await anchor.btcGetTxConfirmationCountAsync(transactionId);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

module.exports = countOfConfirmation;
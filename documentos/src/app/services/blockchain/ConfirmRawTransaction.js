const { anchor } = require('../../config/anchor');

/**
 * @param {String} transactionId
 * @param {String} expectedValue
 * @description Retorna se a transação possui determinado conteúdo
 */
async function confirmRawTransaction(transactionId, expectedValue) {

    try {
        return await anchor.btcConfirmOpReturnAsync(transactionId, expectedValue);
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
}

module.exports = confirmRawTransaction;
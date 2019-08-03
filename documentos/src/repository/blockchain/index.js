const { anchor } = require('../../config/anchor');
const axios = require('axios').default;
const { WALLET_ADDRESS, WALLET_WIF, TOTAL_FREE_SATOSHI, BLOCKCYPHER_API_URL } = require('../../config/secret');

async function createRawTransaction(file, req, res) {

    let hexData = new Buffer.from(file.hash).toString('hex');
    let result;

    try {

        const data = await anchor.btcOpReturnAsync(WALLET_WIF, hexData, TOTAL_FREE_SATOSHI)

        result = {
            txId: data.txId,
            error: null
        };
    } catch (error) {
        result = {
            txId: null,
            error: error.message
        };
    }
    return result;
}

async function splitOutput(maxOutputs) {

    let result;

    try {
        const splitResult = await anchor.btcSplitOutputsAsync(WALLET_PRIVATE_KEY, maxOutputs, TOTAL_FREE_SATOSHI);

        result = {
            splitResult,
            error: null
        };
    } catch (error) {
        result = {
            splitResult: null,
            error: error.message
        };
    }
    return result;
}

async function countOfConfirmation(transactionId) {

    let result;

    try {
        const data = await anchor.btcGetTxConfirmationCountAsync(transactionId);

        result = {
            confirmation: data,
            error: null
        };
    } catch (error) {
        result = {
            confirmation: null,
            error: error.message
        };
    }
    return result;
}

async function statisticOfTransaction(transactionId) {

    let result;

    try {
        const txStats = await anchor.btcGetTxStatsAsync(transactionId);

        result = {
            txStats,
            error: null
        }
    } catch (error) {
        result = {
            txStats: null,
            error: error.message
        };
    }
    return result;
}

async function confirmRawTransaction(transactionId, expectedValue) {


    let result;

    try {
        const confirmed = await anchor.btcConfirmOpReturnAsync(transactionId, expectedValue);

        result = {
            confirmed,
            error: null
        };
    } catch (error) {
        result = {
            confirmed: null,
            error: error.message
        };
    }
    return result;
}

async function getAllTransactions() {

    let result;

    try {
        const listOfTransaction = await axios.get(`${BLOCKCYPHER_API_URL}/addrs/${WALLET_ADDRESS}/full`);
        result = {
            list: listOfTransaction,
            error: null
        };
    } catch (error) {
        result = {
            list: null,
            error: error.message
        };
    }
    return result;
}

module.exports = {
    confirmRawTransaction,
    statisticOfTransaction,
    countOfConfirmation,
    splitOutput,
    createRawTransaction,
    getAllTransactions
}
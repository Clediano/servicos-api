const { anchor } = require('../../config/anchor');
const api = require('../../config/axios');
const { WALLET_PRIVATE_KEY, TOTAL_FREE_SATOSHI } = require('../../config/secret');

async function createRawTransaction(req, res) {

    const { data } = req.body;

    let hexData = new Buffer.from(data).toString('hex');
    let result;

    try {
        const txId = await anchor.btcOpReturnAsync(WALLET_PRIVATE_KEY, hexData, TOTAL_FREE_SATOSHI)

        if (txId) {
            //salvar arquivo no mongo (result -> _id, hash)
            const file = await api.post('file', hexData);

            if (!file._id) res.sendStatus(400).send({ error: 'Não foi possível salvar o documento no banco de dados.' })
            
        }

        result = {
            txId,
            oidFile: file._id,
            error: null
        };
    } catch (error) {
        result = {
            txId: null,
            oidFile: null,
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

module.exports = {
    confirmRawTransaction,
    statisticOfTransaction,
    countOfConfirmation,
    splitOutput,
    createRawTransaction
}
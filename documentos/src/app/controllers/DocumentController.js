const express = require('express');
const { anchor } = require('../config/anchor');
const router = express.Router();

const privateKeyWIF = process.env.WALLET_WIF;
let feeTotalSatoshi = Number(process.env.TRANSACTION_FREE_TOTAL_SATOSHI);

/**
 * Incorpore seus dados de sequência hexadecimais no blockchain e receba um ID de transação Bitcoin e a transação bruta hex como uma resposta
 */
router.post('/create_raw_transaction', async (req, res) => {

    const { data } = req.body;

    let hexData = new Buffer.from(data).toString('hex');
    let txResult;

    try {
        txResult = await anchor.btcOpReturnAsync(privateKeyWIF, hexData, feeTotalSatoshi)

        return res.json(txResult);
    } catch (error) {
        return res.json({ error: error.message });
    }
});


/**
 * Confirme se os dados da string hexadecimal foram incorporados em uma transação Bitcoin,
 *  retornando true ou false
 */
router.get('/confirm_raw_transaction', async (req, res) => {

    const { transactionId, expectedValue } = req.body;
    let confirmed;

    try {
        confirmed = await anchor.btcConfirmOpReturnAsync(transactionId, expectedValue);

        return res.json({ confirmed });
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
})

/**
 *  Obtenha estatísticas sobre uma transação
 *  retornando um objeto contendo
 *  ID da transação,
 *  altura do bloco,
 *  hash do bloco, 
 *  contagem da confirmação,
 *  taxa paga,
 *  tamanho
 *  valor OP_RETURN
 */
router.get('/statistic_of_transaction', async (req, res) => {

    const { transactionId } = req.body;
    let txStats;

    try {
        txStats = await anchor.btcGetTxStatsAsync(transactionId);

        return res.json(txStats);
    } catch (error) {
        return res.json({ error: error.message });
    }
})

router.get('/count_of_transaction', async (req, res) => {

    const { transactionId } = req.body; // the transaction id to to get the confirmation count for
    let count;

    try {
        count = await anchor.btcGetTxConfirmationCountAsync(transactionId);

        return res.json({ count });
    } catch (error) {
        return res.json({ error: error.message });
    }
})

router.post('/split_output', async (req, res) => {

    const { maxOutputs } = req.body;
    let splitResult;

    try {
        splitResult = await anchor.btcSplitOutputsAsync(privateKeyWIF, maxOutputs, feeTotalSatoshi);
        return res.json(splitResult);
    } catch (error) {
        return res.json({ error: error.message });
    }
})

module.exports = app => app.use('/doc', router);
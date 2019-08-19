const express = require('express');
const router = express.Router();
const api = require('../../config/axios');
const fs = require('fs');
const { createRawTransaction, countOfConfirmation, statisticOfTransaction } = require('../../repository/blockchain');
const { createDataRegister, verifyExistTransaction, getExistTransaction, findTransactionsByOrganization } = require('../../repository/documents');

/**
 * @param hash: file hash
 */
router.post('/create', async (req, res) => {
    const { hash } = req.body;

    if (await verifyExistTransaction(hash) === null) {

        const { txId, error } = await createRawTransaction(hash, req, res);

        if (error) res.status(400).send({ error });

        createDataRegister(txId, req, res);
    } else {
        const { hash: transactionId } = await getExistTransaction(hash);

        const { txStats } = await statisticOfTransaction(transactionId);

        res.status(404).send({
            error: 'Este documento já foi registrado!',
            transaction: txStats
        });
    }
});

/**
 * @param transactionId
 */
router.get('/confirmation', async (req, res) => {
    countOfConfirmation(req, res);
});

/**
 * @param transactionId
 */
router.post('/statistic', async (req, res) => {
    statisticOfTransaction(req, res);
});

/**
 * @param organizationId
 */
router.get('/find_transactions', async (req, res) => {
    findTransactionsByOrganization(req, res);
});


module.exports = app => app.use('/doc', router);

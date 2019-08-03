const express = require('express');
const router = express.Router();
const api = require('../../config/axios');
const fs = require('fs');
const { createRawTransaction, countOfConfirmation, statisticOfTransaction } = require('../../repository/blockchain');
const { createDataRegister, verifyExistTransaction } = require('../../repository/documents');

/**
 * data: file
 * organization: organizationId
 */
router.post('/create', async (req, res) => {
       const { hash } = req.body;
    //const { data } = await api.get(`file/findByHash/${hash}`);

    await verifyExistTransaction(hash);

    //const {txId, error} = await createRawTransaction(data, req, res);

    //if (error) res.sendStatus(400).send({ error });

    //createDataRegister(txId, req, res);
});

router.get('/confirmation', async (req, res) => {
    countOfConfirmation(req, res);
});

router.post('/statistic', async (req, res) => {
    statisticOfTransaction(req, res);
});

module.exports = app => app.use('/doc', router);

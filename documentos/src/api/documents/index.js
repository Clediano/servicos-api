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

    //if (await verifyExistTransaction(hash) === null) {
      
        //const {txId, error} = await createRawTransaction(hash, req, res);

        //if (error) res.status(400).send({ error });

        createDataRegister("551172b94d13f1c53c5ca43654aa6f6f2c31dcd66b5254d11cceafbf73725695", req, res);
    //} else {
        //res.status(404).send({ error: 'Este documento já foi registrado!' });
    //}
});

router.get('/confirmation', async (req, res) => {
    countOfConfirmation(req, res);
});

router.post('/statistic', async (req, res) => {
    statisticOfTransaction(req, res);
});

module.exports = app => app.use('/doc', router);

const express = require('express');
const router = express.Router();
const fs = require('fs');
const { createRawTransaction, countOfConfirmation, statisticOfTransaction } = require('../../repository/blockchain');
const { createDataRegister } = require('../../repository/documents');

/**
 * data: file
 * organization: organizationId
 */
router.post('/create', async (req, res) => {
   
    console.log(req.file)
    
    //const transaction = await createRawTransaction(req, res);

    //if (transaction.error) res.sendStatus(400).send({ error });

    //createDataRegister(transaction, req, res);
});

router.get('/confirmation', async (req, res) => {
    countOfConfirmation(req, res);
});

router.post('/statistic', async (req, res) => {
    statisticOfTransaction(req, res);
});

module.exports = app => app.use('/doc', router);

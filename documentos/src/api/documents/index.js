const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploadConfig = require('../../config/upload');
const upload = multer(uploadConfig);

const {
    createRawTransaction,
    countOfConfirmation,
    statisticOfTransaction } = require('../../repository/blockchain');

const {
    createDataRegisterWithHash,
    createDataRegisterWithImage,
    verifyExistTransaction,
    getExistTransaction,
    findTransactionsByOrganization
} = require('../../repository/documents');

/**
 * @param hash: file hash
 */
router.post('/create_with_hash', async (req, res) => {
    const { hash } = req.body;

    if (await verifyExistTransaction(hash) === null) {

        const { txId, error } = await createRawTransaction(hash, req, res);

        if (error) res.status(400).send({ error });

        createDataRegisterWithHash(txId, req, res);
    } else {

        const { hash: transactionId } = await getExistTransaction(hash);

        const { txStats } = await statisticOfTransaction(transactionId);

        res.status(404).send({
            error: 'Este documento já foi registrado.',
            transaction: txStats
        });
    }
});

/**
 * @param image: file hash
 */
router.post('/create_with_image', upload.single('file'), async (req, res) => {
    createDataRegisterWithImage(req, res);
});

/**
 * @param transactionId
 */
router.get('/confirmation/:transactionId', async (req, res) => {
    const result = await countOfConfirmation(req.params.transactionId);

    res.send(result)
});

/**
 * @param transactionId
 */
router.get('/statistic/:transactionId', async (req, res) => {
    statisticOfTransaction(req, res);
});

/**
 * @param organizationId
 */
router.get('/find_transactions/:id/:offset/:limit', async (req, res) => {
    findTransactionsByOrganization(req, res);
});


module.exports = app => app.use('/doc', router);

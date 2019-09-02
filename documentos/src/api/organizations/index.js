const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadConfig = require('../../config/upload');
const upload = multer(uploadConfig);

const { getWalletInformation,
    createWallet,
    updateWallet,
    updateAvatar,
    findOrganizationByName } = require('../../repository/organization');

/**
 * @param organizationid: file hash
 */
router.get('/:id/wallet_information', (req, res) => {
    getWalletInformation(req, res);
});

/**
 * @param Wallet: wallet informations
 */
router.post('/:id/create_wallet', (req, res) => {
    createWallet(req, res);
});

/**
 * @param Wallet: wallet informations
 */
router.put('/:id/update_wallet', (req, res) => {
    updateWallet(req, res);
});

/**
 * @param Image
 */
router.post('/:id/update_avatar', upload.single('file'), async (req, res) => {
    updateAvatar(req, res);
});

/**
 * @param fieldName: fieldName
 */
router.get('/findByName/:value/:offset/:limit', (req, res) => {
    findOrganizationByName(req, res);
});

module.exports = app => app.use('/organization', router);

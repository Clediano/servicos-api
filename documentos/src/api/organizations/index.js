const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadConfig = require('../../config/upload');
const upload = multer(uploadConfig);

const { getWalletInformation,
    createWallet,
    updateWallet,
    updateAvatar,
    sendInvite,
    findOrganizationByName,
    findOrganizationByAddress,
    findOrganizationByPublicKey } = require('../../repository/organization');

/**
 * @param organizationId: file hash
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
 * @param value: value
 * @param offset: offset
 * @param limit: limit
 */
router.get('/:id/findByName/:value/:offset/:limit', (req, res) => {
    findOrganizationByName(req, res);
});

/**
 * @param value: value
 * @param offset: offset
 * @param limit: limit
 */
router.get('/:id/findOrganizationByAddress/:value/:offset/:limit', (req, res) => {
    findOrganizationByAddress(req, res);
});

/**
 * @param value: value
 * @param offset: offset
 * @param limit: limit
 */
router.get('/:id/findOrganizationByPublicKey/:value/:offset/:limit', (req, res) => {
    findOrganizationByPublicKey(req, res);
});

/**
 * @param Image
 */
router.post('/send_invite', async (req, res) => {
    sendInvite(req, res);
});

module.exports = app => app.use('/organization', router);

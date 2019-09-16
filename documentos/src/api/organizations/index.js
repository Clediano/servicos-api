const express = require('express');
const multer = require('multer');

const router = express.Router();

const uploadConfig = require('../../config/upload');
const upload = multer(uploadConfig);

const { sendInvite } = require('../../repository/organization/invite');
const { updateAvatar, removeAvatar } = require('../../repository/organization/avatar');

const { searchAllNotificationByOrganization,
    acceptSolicitaion,
    rejectSolicitaion,
    countNumberOfNotifications } = require('../../repository/organization/notification');

const {
    findOrganizationByAddress,
    findOrganizationByName,
    findOrganizationByPublicKey,
    findSharedOrganizations,
    findSharedOrganizationsByEmail,
    findSharedOrganizationsByName } = require('../../repository/organization/search');

const {
    createWallet,
    updateWallet,
    getWalletInformation } = require('../../repository/organization/wallet');

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
router.post('/:id/update_avatar', upload.single('file'), (req, res) => {
    updateAvatar(req, res);
});
/**
 * @param Image
 */
router.delete('/:organizacaoId/remove_avatar/:avatarId', upload.single('file'), (req, res) => {
    removeAvatar(req, res);
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

/**
 * @param Object: { organizationInterested, organizationInvited }
 */
router.post('/accept_invite', async (req, res) => {
    acceptSolicitaion(req, res);
});

/**
 * @param Object: { organizationInterested, organizationInvited }
 */
router.post('/reject_invitation', async (req, res) => {
    rejectSolicitaion(req, res);
});

/**
 * @param id: id of organization
 */
router.get('/:id/findAllNotifications', (req, res) => {
    searchAllNotificationByOrganization(req, res);
});

/**
 * @param id: id of organization
 */
router.get('/:id/countNumberOfNotifications', (req, res) => {
    countNumberOfNotifications(req, res);
});

/**
 * @param offset: value of filter
 * @param limit: value of filter
 */
router.get('/:id/findSharedOrganizations/:offset/:limit', (req, res) => {
    findSharedOrganizations(req, res);
});

/**
 * @param value: value of filter
 * @param offset: value of filter
 * @param limit: value of filter
 */
router.get('/:id/findSharedOrganizationsByEmail/:value/:offset/:limit', (req, res) => {
    findSharedOrganizationsByEmail(req, res);
});

/**
 * @param value: value of filter
 * @param offset: value of filter
 * @param limit: value of filter
 */
router.get('/:id/findSharedOrganizationsByName/:value/:offset/:limit', (req, res) => {
    findSharedOrganizationsByName(req, res);
});

module.exports = app => app.use('/organization', router);
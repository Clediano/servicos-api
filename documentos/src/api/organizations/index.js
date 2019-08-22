const express = require('express');
const router = express.Router();

const { getWalletInformation } = require('../../repository/organization');

/**
 * @param organizationId: file hash
 */
router.get('/:id/wallet_information', async (req, res) => {
    getWalletInformation(req, res);
});

module.exports = app => app.use('/organization', router);

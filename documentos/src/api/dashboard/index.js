const express = require('express');
const router = express.Router();

const {
    calculePercentSinceLastMonth,
    countNumberOfDocumentsNotRegistred
} = require('../../repository/dashboard');

/**
 * @param organizationId: uuid
 */
router.get('/count_number_of_documents_not_registred/:organizationid', async (req, res) => {
    countNumberOfDocumentsNotRegistred(req, res);
});

module.exports = app => app.use('/dashboard', router);

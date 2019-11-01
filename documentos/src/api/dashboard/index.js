const express = require('express');
const router = express.Router();

const {
    countNumberOfDocumentsNotRegistred
} = require('../../repository/dashboard/documentsNotRegistred');
const {
    countNumberOfDocumentsRegistred
} = require('../../repository/dashboard/documentsRegistred');
const {
    countNumberOfFriends
} = require('../../repository/dashboard/friends');
const {
    countNumberTotalOfDocuments
} = require('../../repository/dashboard/totalDocuments');
const {
    documentsByPeriod
} = require('../../repository/dashboard/documentsByPeriod');

/**
 * @param organizationid: uuid
 */
router.get('/count_number_of_documents_not_registred/:organizationid', async (req, res) => {
    countNumberOfDocumentsNotRegistred(req, res);
});

/**
 * @param organizationid: uuid
 */
router.get('/count_number_of_documents_registred/:organizationid', async (req, res) => {
    countNumberOfDocumentsRegistred(req, res);
});

/**
 * @param organizationid: uuid
 */
router.get('/count_number_of_friends/:organizationid', async (req, res) => {
    countNumberOfFriends(req, res);
});

/**
 * @param organizationid: uuid
 */
router.get('/count_number_total_of_documents/:organizationid', async (req, res) => {
    countNumberTotalOfDocuments(req, res);
});

/**
 * @param organizationid: uuid
 */
router.get('/get_documents_by_period/:organizationid', async (req, res) => {
    documentsByPeriod(req, res);
});

module.exports = app => app.use('/dashboard', router);

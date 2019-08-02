const express = require('express');
const router = express.Router();

const { register, authenticate, forgotPassword } = require('../../repository/authentication');

router.post('/register', async (req, res) => {
    register(req, res);
});

router.post('/authenticate', async (req, res) => {
    authenticate(req, res);
});

router.post('/forgot_password', async (req, res) => {
    forgotPassword(req, res);
});

router.post('/reset_password', async (req, res) => {
    resetPassword(req, res);
});

module.exports = app => app.use('/auth', router);

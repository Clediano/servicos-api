const express = require('express');
const router = express.Router();

const { register, authenticate, forgotPassword } = require('../../repository/authentication');

router.post('/register', async (req, res) => {
    return register(req, res);
});

router.post('/authenticate', async (req, res) => {
    return authenticate(req, res);
});

router.post('/forgot_password', async (req, res) => {
    return forgotPassword(req, res);
});

router.post('/reset_password', async (req, res) => {
    return resetPassword(req, res);
});

module.exports = app => app.use('/auth', router);

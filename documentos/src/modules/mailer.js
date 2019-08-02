const config = require('../config/secret');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const MAIL_HOST = config.MAIL_HOST;
const MAIL_USER = config.MAIL_USER;
const MAIL_PASS = config.MAIL_PASS;
const MAIL_PORT = config.MAIL_PORT;

var transport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: true,
    connectionTimeout: 5000,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
}));

module.exports = transport;

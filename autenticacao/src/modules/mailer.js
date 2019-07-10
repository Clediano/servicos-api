const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;
const MAIL_PORT = process.env.MAIL_PORT;

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

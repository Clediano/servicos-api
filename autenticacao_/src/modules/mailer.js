const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const MAIL_HOST = 'smtp.gmail.com';
const MAIL_USER = 'cledianoestefenon@gmail.com';
const MAIL_PASS = 'xsdcduwhofnawfhm';
const MAIL_PORT = '587';

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

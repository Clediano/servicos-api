const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const config = require('config');

const MAIL_HOST = config.get('MailerConfig.host');
const MAIL_USER = config.get('MailerConfig.user');
const MAIL_PASS = config.get('MailerConfig.pass');
const MAIL_PORT = config.get('MailerConfig.port');

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

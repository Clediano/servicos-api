const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { descriptografar, criptografar } = require('../../cryptography');

const Organization = require('../../database/models').organization;
const mailer = require('../../modules/mailer');

const { AUTH_SECRET } = require('../../config/secret');

async function register(req, res) {

    const { name, email, password } = req.body;

    try {
        const [organization, created] = await Organization.findOrCreate({ where: { email }, defaults: { name, email, password } });

        if (!created) {
            res.status(400).send({ error: 'Este e-mail já está sendo usado.' });
        }

        return res.send({
            organization,
            token: generateToken({ id: organization.id })
        });

    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao se registrar.' })
    }

}

async function authenticate(req, res) {

    const { email: emailCrypto, password: passCrypto } = req.body;

    const email = descriptografar(emailCrypto);
    const password = descriptografar(passCrypto)

    if (!email || !password) {
        res.status(400).send({ error: 'Usuário ou senha inválido.' });
    }

    const organization = await Organization.findOne({ where: { email } });

    if (!organization || !await bcrypt.compare(password, organization.password)) {
        res.status(400).send({ error: 'Usuário ou senha inválido.' });
    }

    organization.password = undefined;

    res.send({
        organization,
        token: generateToken({ id: organization.id })
    });
}

async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        const organization = await Organization.findOne({ where: { email } });

        if (!organization) {
            return res.status(400).send({ error: 'Usuário não encontrado.' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);

        await Organization.update({
            passwordResetToken: token,
            passwordResetExpires: now
        },
            {
                where: { id: organization.id }
            }
        );


        let mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "Recuperação de senha ✔",
            text: `Para recuperar sua senha utilize este token: ${token}.`
        };

        mailer.sendMail(mailOptions, (err, response) => {
            if (err) {
                return res.status(400).send({ error: "Erro ao enviar e-mail de recuperação de senha. Tente novamente mais tarde." });
            }
            return res.send(response);
        });
    } catch (err) {
        res.status(400).send({ error: 'Erro ao recuperar a senha, tente novamente mais tarde.' });
    }
}

async function resetPassword(req, res) {
    const { email, token, password } = req.body;

    try {
        const organization = await Organization.findOne({ where: { email } });

        if (!organization) {
            return res.status(400).send({ error: 'Usuário não encontrado.' });
        }

        if (token !== organization.passwordResetToken) {
            return res.status(400).send({ error: 'Token de recuperação de senha inválido. Verifique o token em sua caixa de entrada de e-mail.' });
        }

        if (new Date() > organization.passwordResetExpires) {
            return res.status(400).send({ error: 'Token expirou.' });
        }

        organization.password = password;
        organization.passwordResetToken = null;
        organization.passwordResetExpires = null;

        await organization.save();

        res.send();
    } catch (err) {
        res.status(400).send({ error: 'Erro ao resetar a senha, tente novamente mais tarde.' });
    }
}

function generateToken(params = {}) {
    return jwt.sign(params, AUTH_SECRET, {
        expiresIn: 18000
    })
}

module.exports = {
    register,
    authenticate,
    forgotPassword,
    resetPassword,
    generateToken
};

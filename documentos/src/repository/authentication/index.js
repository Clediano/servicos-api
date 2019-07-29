// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const mailer = require('../../modules/mailer');

const { sequelize } = require('../../database/models');

const AUTH_SECRET = process.env.AUTH_SECRET;

function register(req, res) {

    console.log(req.body)
    console.log(AUTH_SECRET)
    console.log(sequelize)
    
    // const { name, email, password } = req.body;
    // try {
    //     const [organization, created] = await User.findOrCreate({ where: { email }, defaults: { name, email, password } })

    //     if (!created) {
    //         res.status(400).send({ error: 'Este e-mail já está sendo usado.' });
    //     }

    //     organization.password = undefined;

    //     return res.send({
    //         organization,
    //         token: generateToken({ id: organization.id })
    //     });

    // } catch (err) {
    //     return res.status(400).send({ error: 'Ocorreu um erro ao se registrar.' })
    // }
    
}

function authenticate(req, res) {
    // const { email, password } = req.body;

    // const user = await User.findOne({ where: { email } });

    // if (!user || !await bcrypt.compare(password, user.password)) {
    //     res.status(400).send({ error: 'Usuário ou senha inválido.' });
    // }

    // user.password = undefined;

    // res.send({
    //     user,
    //     token: generateToken({ id: user.id })
    // });
}

function forgotPassword(req, res) {
    // const { email } = req.body;

    // try {
    //     const user = await User.findOne({ where: { email } });

    //     if (!user) {
    //         return res.status(400).send({ error: 'Usuário não encontrado.' });
    //     }

    //     const token = crypto.randomBytes(20).toString('hex');

    //     const now = new Date();
    //     now.setHours(now.getHours() + 1);

    //     await User.update({
    //         passwordResetToken: token,
    //         passwordResetExpires: now
    //     }, { where: { id: user.id } });


    //     let mailOptions = {
    //         from: process.env.MAIL_USER,
    //         to: email,
    //         subject: "Recuperação de senha ✔",
    //         text: `Para recuperar sua senha utilize este token: ${token}.`
    //     };

    //     mailer.sendMail(mailOptions, (err, response) => {
    //         if (err) {
    //             return res.status(400).send({ error: "Erro ao enviar e-mail de recuperação de senha. Tente novamente mais tarde." });
    //         }
    //         return res.send(response);
    //     });
    // } catch (err) {
    //     res.status(400).send({ error: 'Erro ao recuperar a senha, tente novamente mais tarde.' });
    // }
}

function resetPassword(req, res) {
    // const { email, token, password } = req.body;

    // try {
    //     const user = await User.findOne({ where: { email } });

    //     if (!user) {
    //         return res.status(400).send({ error: 'Usuário não encontrado.' });
    //     }

    //     if (token !== user.passwordResetToken) {
    //         return res.status(400).send({ error: 'Token de recuperação de senha inválido. Verifique o token em sua caixa de entrada de e-mail.' });
    //     }

    //     if (new Date() > user.passwordResetExpires) {
    //         return res.status(400).send({ error: 'Token expirou.' });
    //     }

    //     user.password = password;
    //     user.passwordResetToken = null;
    //     user.passwordResetExpires = null;

    //     await user.save();

    //     res.send();
    // } catch (err) {
    //     res.status(400).send({ error: 'Erro ao resetar a senha, tente novamente mais tarde.' });
    // }
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
    resetPassword
};

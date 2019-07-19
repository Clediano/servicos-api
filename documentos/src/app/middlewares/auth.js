const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({ error: 'Token de authenticação não encontrado.' });

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token de authenticação inválido.' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token de authenticação inválido.'});

    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token de authenticação inválido.' });

        req.userId = decoded.id;

        return next();
    });
};
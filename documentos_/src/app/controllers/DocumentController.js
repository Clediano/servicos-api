const express = require('express');
const router = express.Router();

const Document = require('../models/Document');

/**
 * Incorpore seus dados de sequência hexadecimais no blockchain e receba um ID de transação Bitcoin e a transação bruta hex como uma resposta
 */
router.post('/create', async (req, res) => {



    /*Document.create(data)
        .then(document => {
            return res.status(201).send(document);
        })
        .catch(err => {
            console.error(err);
            return res.status(401).json({ error: 'Erro ao criar o documento.' })
        });*/



});

module.exports = app => app.use('/document', router);
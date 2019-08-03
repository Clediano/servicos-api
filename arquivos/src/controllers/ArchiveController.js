const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadConfig = require('../config/upload');
const upload = multer(uploadConfig);
var sha256 = require('js-sha256').sha256;
const Archive = require('../models/Archive');
const fs = require('fs');

router.post('/', upload.single('file'), async (req, res) => {
    fs.readFile(req.file.path, async (err, file) => {

        if (err)
            return res.json({ error: 'Erro ao ler a imagem, por favor, tente novamente.' });

        const arquivo = await Archive.create({ hash: sha256(file), file });

        if (arquivo) {
            fs.unlink(req.file.path, err => {
                if (err)
                    console.error('Erro ao deletar a imagem.', err);
            });

            return res.status(201).json({
                _id: arquivo._id,
                hash: arquivo.hash
            });
        }

        return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const arquivo = await Archive.findById(id);

    if (arquivo)
        return res.send(arquivo);

    return res.status(404).json({ erro: 'Nenhum arquivo com este ID foi encontrado.' });
});

router.get('/findByHash/:hash', async (req, res) => {
    const { hash } = req.params;

    const arquivo = await Archive.findOne({ hash });
    
    if (arquivo)
        return res.send({
            id: arquivo._id,
            hash: arquivo.hash
        });

    return res.status(404).json({ erro: 'Nenhum arquivo com este ID foi encontrado.' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const arquivo = await Archive.findById(id);

    if (arquivo) {
        await Archive.deleteOne({ _id: { $eq: id } });

        return res.sendStatus(204);
    }
    return res.status(404).json({ erro: 'Nenhum arquivo com este ID foi encontrado.' });
});


module.exports = app => app.use('/file', router);

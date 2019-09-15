const Organization = require('../../../database/models').organization;
const axios = require('../../../config/axios');
const fs = require('fs');
const FormData = require('form-data');

async function updateAvatar(req, res) {

    const organization = await Organization.findOne({ where: { id: req.params.id } })

    if (!organization) return res.json({ error: 'Organização não encontrada.' });

    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));
    formData.append('filename', req.file.filename);
    formData.append('mimetype', req.file.mimetype);
    formData.append('size', req.file.size);

    const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}` } };

    if (organization.oidphoto) {
        axios.delete(`/file/${organization.oidphoto}`).catch(err => {
            return res.json({ error: 'Ocorreu um erro ao atualizar o avatar. Tente novamente mais tarde.' });
        })
        saveImage(req, res, formData, config);

    } else {
        saveImage(req, res, formData, config);
    }
}

async function saveImage(req, res, formData, config) {
    axios.post('/file', formData, config)
        .then(({ data }) => {
            Organization.update({ oidphoto: data._id }, { where: { id: req.params.id } });

            return res.status(201).json(data);
        })
        .catch(err => {
            console.error(err)
            return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
        })
        .finally(() => {
            fs.unlink(req.file.path, err => {
                if (err) console.error('Erro ao deletar a imagem.', err);
            });
        })
}

async function removeAvatar(req, res) {
    const { organizacaoId, avatarId } = req.params;

    Organization.update({
        oidphoto: null
    }, { where: { id: organizacaoId } })
        .then(() => {
            axios.delete(`/file/${avatarId}`)
                .then(() => {
                    return res.status(201).json('OK');
                })
                .catch(err => {
                    Organization.update({ oidphoto: avatarId }, { where: { id: organizacaoId } });
                    console.error(err)
                    return res.status(400).json({ error: 'Erro ao remover avatar. Tente novamente mais tarde.' })
                })
        }).catch(err => {
            return res.status(400).json({ error: 'Erro ao remover avatar. Tente novamente mais tarde.' })
        })
}

module.exports = {
    updateAvatar,
    removeAvatar
}
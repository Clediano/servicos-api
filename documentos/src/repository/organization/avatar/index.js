const Organization = require('../../../database/models').organization;
const axios = require('../../../config/axios');
const fs = require('fs');
const FormData = require('form-data');

async function updateAvatar(req, res) {

    const organization = await Organization.findOne({ where: { id: req.params.id } })

    if (!organization) return res.json({ error: 'Organização não encontrada.' });

    if (organization.oidphoto) {
        axios.delete(`/file/${organization.oidphoto}`)
            .then(() => {

                fs.readFile(req.file.path, (err, file) => {

                    if (err) return res.json({ error: 'Erro ao ler a imagem, por favor, tente novamente.' });

                    const formData = new FormData();
                    formData.append('file', fs.createReadStream(req.file.path));

                    const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}` } };

                    axios.post('/file', formData, config)
                        .then(resp => {

                            fs.unlink(req.file.path, err => {
                                if (err) console.error('Erro ao deletar a imagem.', err);
                            });

                            Organization.update({ oidphoto: resp.data._id }, { where: { id: req.params.id } });

                            return res.status(201).json({
                                _id: resp.data._id,
                                hash: resp.data.hash
                            });

                        })
                        .catch(err => {
                            console.error(err)
                            return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
                        })
                });

            })
            .catch(err => {
                return res.json({ error: 'Ocorreu um erro ao atualizar o avatar. Tente novamente mais tarde.' });
            })
    } else {
        fs.readFile(req.file.path, (err, file) => {

            if (err) return res.json({ error: 'Erro ao ler a imagem, por favor, tente novamente.' });

            const formData = new FormData();
            formData.append('file', fs.createReadStream(req.file.path));

            const config = { headers: { 'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}` } };

            axios.post('/file', formData, config)
                .then(resp => {

                    fs.unlink(req.file.path, err => {
                        if (err) console.error('Erro ao deletar a imagem.', err);
                    });

                    Organization.update({ oidphoto: resp.data._id }, { where: { id: req.params.id } });

                    return res.status(201).json({
                        _id: resp.data._id,
                        hash: resp.data.hash
                    });

                })
                .catch(err => {
                    console.error(err)
                    return res.status(400).json({ error: 'Erro ao salvar arquivo no banco de dados.' })
                })
        });
    }
}

module.exports = {
    updateAvatar
}
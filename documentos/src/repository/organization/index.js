const Wallet = require('../../database/models').wallet;
const Organization = require('../../database/models').organization;
const axios = require('../../config/axios');
const fs = require('fs');
const FormData = require('form-data');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { verifyExistOrganization } = require('./functions');

async function getWalletInformation(req, res) {

    const organizationid = req.params.id;

    if (!await verifyExistOrganization(organizationid)) {
        return res.status(400).send({ error: 'Organização não encontrada. Verifique o ID da organização e tente novamente.' });
    }

    try {
        const wallet = await Wallet.findOne({ where: { organizationid } });

        if (!wallet) {
            res.status(400).send({ error: 'Carteira da organização não encontrada.' });
        }

        return res.send({ wallet });

    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao buscar a carteira.' })
    }

}

async function createWallet(req, res) {
    const organizationid = req.params.id;
    const { publickey, privatekey, wif, address } = req.body;

    try {
        const [wallet] = await Wallet.findOrCreate({ where: { publickey, privatekey, wif, address }, defaults: { publickey, privatekey, wif, address, organizationid } });

        res.status(201).send({ wallet });

    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao cadastrar a carteira.' })
    }

};

async function updateWallet(req, res) {
    const organizationid = req.params.id;
    const { publickey, privatekey, wif, address } = req.body;

    if (!organizationid) {
        return res.status(400).send({ error: 'É necessário fornecer o ID da carteira para poder atualizá-lo.' });
    }

    if (!await verifyExistOrganization(organizationid)) {
        return res.status(400).send({ error: 'Organização não encontrada. Verifique o ID da organização e tente novamente.' });
    }

    try {
        const [rowsUpdated, [{ dataValues }]] = await Wallet.update({ organizationid, publickey, privatekey, wif, address, organizationid }, { where: { organizationid }, returning: true });

        res.status(201).send({ wallet: dataValues });
    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao atualizar o registro.' });
    }
}

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

async function findOrganizationByName(req, res) {

    const value = req.params.value;
    const offset = (req.params.offset || 1) * 4;
    const limit = (req.params.limit || 4);

    try {

        const organizations = await Organization
            .findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${value}%`
                    }
                },
                attributes: ['name', 'email', 'id', 'oidphoto'],
                offset,
                limit
            });

        return res.send({ organizations });

    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao efetuar a pesquisa.' })
    }

}

module.exports = {
    getWalletInformation,
    createWallet,
    updateWallet,
    updateAvatar,
    findOrganizationByName
};

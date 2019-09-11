const Wallet = require('../../../database/models').wallet;
const Organization = require('../../../database/models').organization;

const { verifyExistOrganization } = require('../functions');

async function getWalletInformation(req, res) {

    const organizationid = req.params.id;

    try {
        const wallet = await Wallet.findOne({
            where: {
                organizationid
            }
        });

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
    const organizationId = req.params.id;
    const { publickey, privatekey, wif, address } = req.body;

    try {
        const [wallet] = await Wallet.findOrCreate({
            where: {
                publickey,
                privatekey,
                wif,
                address
            },
            defaults: {
                publickey,
                privatekey,
                wif,
                address,
                organizationId
            }
        });

        res.status(201).send({ wallet });

    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao cadastrar a carteira.' })
    }

};

async function updateWallet(req, res) {
    const organizationId = req.params.id;
    const { publickey, privatekey, wif, address } = req.body;

    if (!organizationId) {
        return res.status(400).send({ error: 'É necessário fornecer o ID da carteira para poder atualizá-lo.' });
    }

    if (!await verifyExistOrganization(organizationId)) {
        return res.status(400).send({ error: 'Organização não encontrada. Verifique o ID da organização e tente novamente.' });
    }

    try {
        const [rowsUpdated, [{ dataValues }]] = await Wallet.update({ organizationId, publickey, privatekey, wif, address }, { where: { organizationId }, returning: true });

        res.status(201).send({ wallet: dataValues });
    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao atualizar o registro.' });
    }
}

module.exports = {
    getWalletInformation,
    createWallet,
    updateWallet
};

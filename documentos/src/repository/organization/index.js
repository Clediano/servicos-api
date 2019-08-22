const Wallet = require('../../database/models').wallet;

async function getWalletInformation(req, res) {

    const id = req.params.id;

    try {
        const wallet = await Wallet.findOne({ where: { organizationId: id } });

        if (!wallet) {
            res.status(400).send({ error: 'Carteira da organização não existe.' });
        }

        return res.send({ wallet });

    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao buscar a carteira.' })
    }

}

module.exports = {
    getWalletInformation
};

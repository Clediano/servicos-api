const Wallet = require('../../../database/models').wallet;
const Organization = require('../../../database/models').organization;
const Intersted = require('../../../database/models').intersted;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { findElementsWithInvite } = require('../functions');

async function findOrganizationByName(req, res) {

    const value = req.params.value;
    const offset = (req.params.offset || 1) * 4;
    const limit = (req.params.limit || 4);
    const organizationId = req.params.id;
    var organizationsWithInvite = await findElementsWithInvite(organizationId);

    try {

        const organizations = await Organization
            .findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${value}%`
                    },
                    id: {
                        [Op.notIn]: [organizationId, ...organizationsWithInvite]
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

async function findOrganizationByAddress(req, res) {

    const value = req.params.value;
    const offset = (req.params.offset || 1) * 4;
    const limit = (req.params.limit || 4);
    const organizationId = req.params.id;
    var organizationsWithInvite = await findElementsWithInvite(organizationId);

    try {

        const organizations = await Wallet
            .findAndCountAll({
                where: {
                    address: {
                        [Op.like]: `%${value}%`
                    },
                    organizationid: {
                        [Op.not]: [organizationId, ...organizationsWithInvite]
                    },

                },
                attributes: {
                    exclude: ['address', 'privatekey', 'publickey', 'wif', 'createdAt', 'updatedAt', 'id', 'organizationid'],
                },
                include: [{
                    model: Organization,
                    attributes: ['name', 'email', 'id', 'oidphoto'],
                }],
                offset,
                limit
            });

        return res.send({ organizations });

    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao efetuar a pesquisa.' })
    }
}

async function findOrganizationByPublicKey(req, res) {

    const value = req.params.value;
    const offset = (req.params.offset || 1) * 4;
    const limit = (req.params.limit || 4);
    const organizationId = req.params.id;
    var organizationsWithInvite = await findElementsWithInvite(organizationId);

    try {

        const organizations = await Wallet
            .findAndCountAll({
                where: {
                    publickey: {
                        [Op.like]: `%${value}%`
                    },
                    organizationid: {
                        [Op.not]: [organizationId, ...organizationsWithInvite]
                    },

                },
                attributes: {
                    exclude: ['address', 'privatekey', 'publickey', 'wif', 'createdAt', 'updatedAt', 'id', 'organizationid'],
                },
                include: [{
                    model: Organization,
                    attributes: ['name', 'email', 'id', 'oidphoto'],
                }],
                offset,
                limit
            });

        return res.send({ organizations });

    } catch (err) {
        console.error(err)
        return res.status(400).send({ error: 'Ocorreu um erro ao efetuar a pesquisa.' })
    }
}

async function findSharedOrganizations(req, res) {

    const organizationId = req.params.id;

    const offset = (req.params.offset || 1) * 4;
    const limit = (req.params.limit || 4);

    try {
        Intersted.findAll({
            where: {
                organizationInterested: organizationId,
                match: true
            },
            include: [
                { model: Organization, required: true }
            ],
            offset,
            limit
        })
            .then(intersteds => {
                res.send(intersteds);
            })
            .catch(err => {
                console.error(err)
                res.status(400).send({ error: 'Ocorreu um erro ao localizar seus contatos pareados.' })
            })
    } catch (err) {
        res.status(400).send({ error: 'Ocorreu um erro ao localizar seus contatos pareados.' })
    }

}

module.exports = {
    findOrganizationByName,
    findOrganizationByAddress,
    findOrganizationByPublicKey,
    findSharedOrganizations
}
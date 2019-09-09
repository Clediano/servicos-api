const Intersted = require('../../../database/models').intersted;
const Organization = require('../../../database/models').organization;

async function searchAllNotificationByOrganization(req, res) {
    const organizationId = req.params.id;

    let organizationsInteresteds = [];

    const intersteds = await Intersted.findAll({
        where: {
            organizationInvited: organizationId,
            match: false
        },
        raw: true
    });

    if (intersteds && intersteds.length > 0) {
        let orgs = [];

        for (let i = 0; i < intersteds.length; i++) {

            const intersted = intersteds[i];

            await Organization.findOne({
                where: {
                    id: intersted.organizationInterested
                },
                attributes: ['name', 'email', 'id', 'oidphoto'],
            }).then(result => {
                orgs.push(result.dataValues)
            }).catch(err => {
                console.error(err)
            })
        }
        res.status(200).send({ organizationsInteresteds: orgs });
    }

    res.status(200).send({ organizationsInteresteds });
}

async function acceptSolicitaion(req, res) {
    const { organizationInterested, organizationInvited } = req.body;

    Intersted.findOne({
        where: {
            organizationInvited,
            organizationInterested,
            match: false
        }
    })
        .then(({ dataValues }) => {
            Intersted.update({ ...dataValues, match: true }, { where: { id: dataValues.id }, returning: true })
                .then(({ dataValues }) => {
                    res.send(dataValues)
                })
                .catch(err => {
                    res.status(400).send({ error: 'Ocorreu um erro ao aceitar o convite de compartilhamento. Tente novamente mais tarde.' })
                })
        })
        .catch(err => {
            res.status(400).send({ error: 'Ocorreu um erro ao aceitar o convite de compartilhamento. Tente novamente mais tarde.' })
        })
}

async function rejectSolicitaion(req, res) {
    const { organizationInterested, organizationInvited } = req.body;

    Intersted.findOne({
        where: {
            organizationInvited,
            organizationInterested,
            match: false
        }
    })
        .then(({ dataValues }) => {
            Intersted.destroy({ where: { id: dataValues.id } })
                .then(() => {
                    res.status(200).send('OK')
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send({ error: 'Ocorreu um erro ao rejeitar o convite de compartilhamento. Tente novamente mais tarde.' })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({ error: 'Ocorreu um erro ao rejeitar o convite de compartilhamento. Tente novamente mais tarde.' })
        })
}

async function countNumberOfNotifications(req, res) {
    const organizationId = req.params.id;

    const intersteds = await Intersted.findAndCountAll({
        where: {
            organizationInvited: organizationId,
            match: false
        },
    });
    res.send({ count: intersteds.count })
}

module.exports = {
    searchAllNotificationByOrganization,
    countNumberOfNotifications,
    acceptSolicitaion,
    rejectSolicitaion,
}
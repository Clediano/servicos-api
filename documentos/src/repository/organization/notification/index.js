const Friends = require('../../../database/models').friend;
const Organization = require('../../../database/models').organization;

async function searchAllNotificationByOrganization(req, res) {
    const organizationId = req.params.id;

    let organizationsInteresteds = [];

    const friends = await Friends.findAll({
        where: {
            organizationInvited: organizationId,
            match: false
        },
        raw: true
    });

    if (friends && friends.length > 0) {
        let orgs = [];

        for (let i = 0; i < friends.length; i++) {

            const friend = friends[i];

            await Organization.findOne({
                where: {
                    id: friend.organizationInterested
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

    Friends.findOne({
        where: {
            organizationInvited,
            organizationInterested,
            match: false
        }
    })
        .then(({ dataValues }) => {
            Friends.update({ ...dataValues, match: true }, { where: { id: dataValues.id }, returning: true })
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

    Friends.findOne({
        where: {
            organizationInvited,
            organizationInterested,
            match: false
        }
    })
        .then(({ dataValues }) => {
            Friends.destroy({ where: { id: dataValues.id } })
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

    const friends = await Friends.findAndCountAll({
        where: {
            organizationInvited: organizationId,
            match: false
        },
    });
    res.send({ count: friends.count })
}

module.exports = {
    searchAllNotificationByOrganization,
    countNumberOfNotifications,
    acceptSolicitaion,
    rejectSolicitaion,
}
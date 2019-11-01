const Friends = require('../../../database/models').friend;
const Organization = require('../../../database/models').organization;

async function searchAllNotificationByOrganization(req, res) {
    const organizationid = req.params.id;

    const solicitations = await Friends.findAll({
        where: {
            invitedid: organizationid,
            match: false
        },
        attributes: {
            exclude: ['id', 'match', 'invitedid', 'interestedid', 'createdAt', 'updatedAt'],
        },
        include: [
            { model: Organization, as: 'Interested', attributes: ['name', 'email', 'id', 'oidphoto'] }
        ],
        raw: true
    });

    res.send({ organizationsInteresteds: solicitations })
}

async function acceptSolicitaion(req, res) {
    const { interestedid, invitedid } = req.body;

    Friends.findOne({
        where: {
            invitedid,
            interestedid,
            match: false
        }
    }).then(({ dataValues }) => {
        Friends.update({ match: true }, { where: { id: dataValues.id }, returning: true }).then(({ dataValues }) => {
            res.send(dataValues)
        }).catch(err => {
            console.log(err)
            res.status(400).send({ error: 'Ocorreu um erro ao aceitar o convite de compartilhamento. Tente novamente mais tarde.' })
        })
    }).catch(err => {
        console.log(err)
        res.status(400).send({ error: 'Ocorreu um erro ao aceitar o convite de compartilhamento. Tente novamente mais tarde.' })
    })
}

async function rejectSolicitaion(req, res) {
    const { interestedid, invitedid } = req.body;

    Friends.findOne({
        where: {
            invitedid,
            interestedid,
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
    const organizationid = req.params.id;

    const friends = await Friends.findAndCountAll({
        where: {
            invitedid: organizationid,
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
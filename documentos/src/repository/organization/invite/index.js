const Intersted = require('../../../database/models').intersted;

async function sendInvite(req, res) {

    const { organizationInvited, organizationInterested } = req.body;

    await Intersted.findOrCreate({
        where: {
            organizationInvited,
            organizationInterested
        },
        defaults: {
            organizationInvited,
            organizationInterested,
            match: false
        }
    });

    res.status(200).send('OK');
}

module.exports = {
    sendInvite
}
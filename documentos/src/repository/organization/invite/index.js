const Friend = require('../../../database/models').friend;

async function sendInvite(req, res) {

    const { invitedid, interestedid } = req.body;

    await Friend.findOrCreate({
        where: { invitedid, interestedid },
        defaults: {
            invitedid,
            interestedid,
            match: false
        }
    });

    res.status(200).send('OK');
}

module.exports = {
    sendInvite
}
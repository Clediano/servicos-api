const Friend = require('../../../database/models').friend;

async function countNumberOfFriends(req, res) {
    const { organizationid } = req.params;

    let friendsMatched = 0;
    let friendsWaiting = 0;

    Friend.findAndCountAll({
        where: {
            interestedid: organizationid
        }
    }).then(resp => {        
        resp.rows.forEach(friend => {
            if(friend.match) {
                friendsMatched += 1;
            } else {
                friendsWaiting += 1;
            }
        })
        res.send({
            friendsMatched,
            friendsWaiting,
            total: resp.count
        })
    }).catch(err => {
        res.status(404).send({ error: 'Ocorreu um erro ao contar o número de amigos.' })
    })
}

module.exports = {
    countNumberOfFriends
};

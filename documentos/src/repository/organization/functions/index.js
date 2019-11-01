const Organization = require('../../../database/models').organization;
const Friend = require('../../../database/models').friend;

async function verifyExistOrganization(organizationid) {
    try {
        const organization = await Organization.findOne({ where: { id: organizationid } })

        if (organization) {
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findOrganizationById(organizationid) {
    return await Organization.findOne({ where: { id: organizationid } })
}

async function findElementsWithInvite(organizationid) {
    let organizationInvited = [];

    const dataValues = await Friend.findAll({ where: { interestedid: organizationid }, attributes: ["invitedid"], raw: true });

    organizationInvited = dataValues.map(obj => {
        return obj['invitedid'];
    });

    organizationInvited.push(organizationid);

    return organizationInvited;
}

module.exports = {
    verifyExistOrganization,
    findElementsWithInvite,
    findOrganizationById
}
const Organization = require('../../../database/models').organization;
const Intersted = require('../../../database/models').intersted;

async function verifyExistOrganization(organizationId) {
    try {
        const organization = await Organization.findOne({ where: { id: organizationId } })

        if (organization) {
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function findOrganizationById(organizationId) {
    return await Organization.findOne({ where: { id: organizationId } })
}

async function findElementsWithInvite(organizationId) {
    let organizationInvited = [];

    const dataValues = await Intersted.findAll({ where: { organizationInterested: organizationId }, attributes: ["organizationInvited"], raw: true });

    organizationInvited = dataValues.map(obj => {
        return obj['organizationInvited'];
    });

    organizationInvited.push(organizationId);

    return organizationInvited;
}

module.exports = {
    verifyExistOrganization,
    findElementsWithInvite,
    findOrganizationById
}
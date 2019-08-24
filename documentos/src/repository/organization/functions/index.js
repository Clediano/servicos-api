const Organization = require('../../../database/models').organization;

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

module.exports = {
    verifyExistOrganization
}
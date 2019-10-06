const Document = require('../../../database/models').document;
const Transaction = require('../../../database/models').transaction;

async function countNumberOfDocumentsRegistred(req, res) {
    const { organizationid } = req.params;

    Transaction.findAndCountAll({
        include: [{
            model: Document,
            where: {
                organizationid: organizationid
            },
        }],
        where: {
            confirmed: true
        }
    }).then(resp => {
        const now = new Date();
        const aMonthAgo = now.getTime() - 2628000000;

        const sinceLastMonth = resp.rows.filter(doc => {
            const timestamp = new Date(doc.createdAt).getTime();
            return timestamp < now && timestamp > aMonthAgo;
        })
        res.send({
            sinceLastMonth: sinceLastMonth.length,
            documentsCount: resp.count
        })
    }).catch(err => {
        res.status(404).send({ error: 'Ocorreu um erro ao contar o número de documentos registrados.' })
    })
}

module.exports = {
    countNumberOfDocumentsRegistred
};

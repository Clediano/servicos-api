const Document = require('../../../database/models').document;
const Transaction = require('../../../database/models').transaction;

async function countNumberTotalOfDocuments(req, res) {
    const { organizationid } = req.params;

    Transaction.findAndCountAll({
        include: [{
            model: Document,
            where: {
                organizationid: organizationid
            },
        }],
    }).then(resp => {
        res.send({
            total: resp.count
        })
    }).catch(err => {
        res.status(404).send({ error: 'Ocorreu um erro ao contar o número de documentos.' })
    })
}

module.exports = {
    countNumberTotalOfDocuments
};

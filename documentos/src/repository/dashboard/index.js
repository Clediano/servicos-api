const Document = require('../../database/models').document;
const Transaction = require('../../database/models').transaction;


async function countNumberOfDocumentsNotRegistred(req, res) {
    const { organizationid } = req.params;

    Transaction.findAndCountAll({
        include: [{
            model: Document,
            where: {
                organizationid: organizationid
            },
        }],
        where: {
            confirmed: false
        }
    }).then(resp => {
        res.send({ documentsCount: resp.count })
    }).catch(err => {
        res.status(404).send({ error: 'Ocorreu um erro ao contar o número de documentos não registrados.' })
    })
}

async function calculePercentSinceLastMonth(req, res) {
    const { organizationid } = req.params;

    const documents = await Transaction.findAndCountAll({
        include: [{
            model: Document,
            where: {
                organizationid: organizationid
            },
        }]
    });
    res.send({ documents })
}

module.exports = {
    countNumberOfDocumentsNotRegistred,
    calculePercentSinceLastMonth
};

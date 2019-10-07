const Document = require('../../../database/models').document;
const Transaction = require('../../../database/models').transaction;
const Op = require('sequelize').Op;

async function documentsByPeriod(req, res) {
    const { organizationid } = req.params;
    const { dataInicial, dataFinal } = req.query;

    Transaction.findAndCountAll({
        include: [{
            model: Document,
            where: {
                organizationid: organizationid
            },
            attributes: ['id']
        }],
        where: {
            createdAt: {
                [Op.between]: [dataInicial, dataFinal]
            }
        },
        attributes: ['id', 'createdAt']
    }).then(resp => {
        res.send({
            resp
        })
    }).catch(err => {
        res.status(404).send({ error: 'Ocorreu um erro ao buscar os documentos.' })
    })
}

module.exports = {
    documentsByPeriod
};

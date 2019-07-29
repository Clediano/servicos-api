const createRawTransaction = require('../blockchain/CreateRawTransaction');
const statisticOfTransaction = require('../blockchain/StatisticOfTransaction');
const Document = require('../../models/Document');
const Transaction = require('../../models/Transaction');

/**
 * @param {String} hashFile 
 * @description Registra o documento na blockchain, salva-o no bando de dados e retorna informações sobre o documento registrado
 */
async function createNewDocument(hashFile) {

    const [txId, error] = await createRawTransaction(hashFile);

    const statistics = await statisticOfTransaction(txId);

    const [transaction, error] = saveTransaction(statistics);

    if (error) return res.status(400).send({ error });

    const document = saveDocument({}, transaction);

    if (transacao.error) return res.status(400).send({ error: transacao.error });

}

function saveDocument(document, transaction) {
    return {
        id: uuid(),
        oid_document: '384715j013f74-1j34hg71340-f871-34578574',
        transaction_id: transaction.id
    }
}

function saveTransaction(transaction) {
    Transaction.create(
        {
            id_transaction: transaction.id,
            height: transaction.blockHeight,
            hash: transaction.blockHash,
            confirmed: false,
            confirmations: transaction.confirmations,
            size: transaction.sizeBytes
        }
    )
        .then(transaction => {
            return { transaction };
        })
        .catch(err => {
            console.error(err);
            return { error: 'Ocorreu um erro ao salvar a transação.' }
        });
}

module.exports = createNewDocument;
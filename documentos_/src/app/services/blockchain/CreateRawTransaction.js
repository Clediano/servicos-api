const { anchor } = require('../../config/anchor');
const config = require('config');

const privateKeyWIF = config.get('Wallet.wif');
const feeTotalSatoshi = config.get('totalFreeSatoshi');;

/**
 * @param {String} data
 * @description HASH do documento a ser registrado
 */
async function createRawTransaction(data) {

    let hexData = new Buffer.from(data).toString('hex');

    try {
        return await anchor.btcOpReturnAsync(privateKeyWIF, hexData, feeTotalSatoshi)
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = createRawTransaction;
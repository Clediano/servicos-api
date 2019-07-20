const { anchor } = require('../../config/anchor');
const config = require('config');

const privateKeyWIF = config.get('Wallet.wif');
const feeTotalSatoshi = config.get('totalFreeSatoshi');;


/**
 * @param {Integer} maxOutputs
 * @description Gera novos UTXOS
 */
async function splitOutput(maxOutputs) {
    try {
        return await anchor.btcSplitOutputsAsync(privateKeyWIF, maxOutputs, feeTotalSatoshi);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

module.exports = splitOutput;
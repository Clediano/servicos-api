const BlockchainAnchor = require('blockchain-anchor');
const config = require('config');

const anchor = new BlockchainAnchor({
    //optional: use testnet for bitcoin transactions, default: false
    btcUseTestnet: true,
    //optional: select a service to use, default: Any
    service: 'blockcypher',
    //optional: required only when using blockcypher service
    blockcypherToken: config.get('Blockcypher.token'),
    //optional: connect to a custom instance of Bitcore's insight api when using insightapi service, defaults to insight.bitpay.com public api
    insightApiBase: 'http://my.server.com/insight-api',
    //optional: when specifying a custom insightApiBase, retry with the insight.bitpay.com public api in the event of failure, defaults to false
    insightFallback: true
});

module.exports = {
    anchor
}

function filterTransactionByHash({ data }, hash) {
    if (data) {
        const list = data.txs.filter(element => {
            return element.outputs[0].data_string === hash;
        });
        return list;
    }
}

module.exports = {
    filterTransactionByHash
}

async function filterTransactionByHash({ data }, hash) {
    if (data) {
        data.txs.filter(({ outputs }) => {
            console.log(outputs)
        });
    }
}

module.exports = {
    filterTransactionByHash
}
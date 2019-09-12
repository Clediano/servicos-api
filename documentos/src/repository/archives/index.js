const axios = require('../../config/axios');

async function saveArchive(formData, config, onSuccess, onError, onFinally) {
    axios.post('/file', formData, config)
        .then(({ data }) => {
            onSuccess && onSuccess(data);
        })
        .catch(err => {
            onError && onError(err);
        })
        .finally(() => {
            onFinally && onFinally();
        })
}

async function getArchive(idDocument, config, onSuccess, onError, onFinally) {
    axios.get(`/file/${idDocument}`, config)
        .then(({ data }) => {
            onSuccess && onSuccess(data)
        })
        .catch(err => {
            onError && onError(err)
        })
        .finally(() => {
            onFinally && onFinally()
        })
}

module.exports = {
    saveArchive,
    getArchive
}
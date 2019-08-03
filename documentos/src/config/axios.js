const axios = require('axios').default;
const { generateToken } = require('../repository/authentication');

const bearerToken = 'Bearer '.concat(generateToken())

const api = axios.create({
    headers: { Authorization: bearerToken },
    baseURL: 'http://localhost:3002'
});

module.exports = api;
const axios = require('axios').default;
const { generateToken } = require('../repository/authentication');
const { AUTH_BASE_URL } = require('./secret');

const bearerToken = 'Bearer '.concat(generateToken())

const api = axios.create({
    headers: { Authorization: bearerToken },
    baseURL: AUTH_BASE_URL
});

module.exports = api;
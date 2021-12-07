const axios = require('axios');

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://fastis-jdzq8.ondigitalocean.app'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = '';

module.exports = instance;
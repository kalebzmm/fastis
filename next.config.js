module.exports = {
    serverRuntimeConfig: {
        clientId: 'app',
        clientSecret: 'app_secret',
        secret: 'THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING'
    },
    publicRuntimeConfig: {
        apiEndpoint: 'https://fastis-jdzq8.ondigitalocean.app',
        apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/api' // development api
            : 'http://localhost:3000/api' // production api
    }
}

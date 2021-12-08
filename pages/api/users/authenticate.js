const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
const axios = require('axios');

import { apiHandler } from 'helpers/api';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

// users in JSON file for simplicity, store in a db for production applications
const users = require('data/users.json');

export default apiHandler(handler);

function handler(req, res) {

    const { apiEndpoint } = publicRuntimeConfig;
    const { clientId, clientSecret } = serverRuntimeConfig;

    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function login(username, password){
        let response;
        try{
            response = await axios.get(`${apiEndpoint}/login`, {}, {
                auth: {
                    username,
                    password
                }
            })
        }catch(e){
            console.log(e.response)
            switch(e.response.status){
                case 401:
                    throw 'Usuário e/ou senha incorretos'
                default:
                    throw 'Ocorreu um erro ao tentar se comunicar com o servidor de autenticação'
            }
        }

        return response.data;

    }

    async function authenticate() {
        const { username, password } = req.body;

        let data = await login(username, password);

        // return basic user details and token
        return res.status(200).json({
            username,
        });
    }
}

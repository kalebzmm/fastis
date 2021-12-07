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

    async function getCode(username, password){
        let response;
        try{
            response = await axios.post(`${apiEndpoint}/auth/login`, {
                client_id: clientId,
                client_secret: clientSecret,
                username,
                password
            })
        }catch(e){
            switch(e.status.code){
                case 401:
                    throw 'Usuário e/ou senha incorretos'
                default:
                    throw 'Ocorreu um erro ao tentar se comunicar com o servidor de autenticação'
            }
        }

        return response.data.code;

    }

    async function getToken(code, username) {
        let response;
        try{
            response = await axios.post(`${apiEndpoint}/auth/token`, {
                code,
                clientId: clientId,
                username
            })
        }catch(e){
            switch(e.status.code){
                case 401:
                    throw 'Usuário e/ou senha incorretos'
                default:
                    throw 'Ocorreu um erro ao tentar se comunicar com o servidor de autenticação'
            }
        }
        return response.data;
    }

    async function authenticate() {
        // const { username, password } = req.body;

        // const code = await getCode(username, password);
        // const { accessToken, refreshToken } = await getToken(code, username);

        // return basic user details and token
        return res.status(200).json({
            accessToken: '231232112hj12h2g3hj21g3123g1j23g1',
            refreshToken: '2tq7dbasd67wqdbqwydo'
        });
    }
}

import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import fastis from '../helpers/axios'
import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    getAll
};

async function login(username, password) {
    let response;
    try{
        response = await fastis.get(`/login`, {
            auth: {
                username,
                password
            }
        })
        let user = response.data;
        userSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }catch(e){
        console.log(e.request)
        switch(e.response.status){
            case 401:
                throw 'Usuário e/ou senha incorretos'
            default:
                throw 'Ocorreu um erro ao tentar se comunicar com o servidor de autenticação'
        }
    }

    return response.data;
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function getAll() {
    return fetchWrapper.get(baseUrl);
}

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';


const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:3107';

const responseBody = res => res.body;

let token = null;
// resgata o token 
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Anuncios = {
    all: page =>
        requests.get(`/anuncio/1`)
};

const Auth = {
    current: () =>
        requests.get('/usuario'),
    login: (email, senha) =>
        requests.post('auth/login/usuario', { user: { email, senha}})
}

export default {
    Anuncios,
    Auth,
    setToken: _token => { token = _token; }
}
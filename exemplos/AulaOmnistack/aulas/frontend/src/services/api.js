import axios from 'axios';


// chama o axios, e diz que base da URL vai ser http.... para quando mudar para
// o servidor, é só mudar a base, pra que não precise alterar em todas as paginas
const api = axios.create({
    baseURL: 'http://localhost:3009'
});

export default api;
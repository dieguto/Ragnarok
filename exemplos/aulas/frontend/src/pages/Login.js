import React, { useState } from 'react';
import './css/Login.css';

import api from '../services/api';

import logo from '../assets/logo.png'

import {GiDiceTwentyFacesTwenty} from 'react-icons/gi'

export default function Login( { history } ) {

    // useState retorna não só o valor do input, como retorna uma função
    // toda a vez que eu precisar utilizar o username, eu chamo a função setUsername
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

    //função que vai ser disparada quando o usuário da um submit
    // e = evento
    // transformo a função em assíncrona
    async function handleSubmit(e) {
        e.preventDefault();

        // await = diz para esperar retornar da api
        const response = await api.post('/login/usuario', {
            email : username,
            senha
        })

        const { id } = response.data.usuario;

        console.log(response)


        history.push(`/usuario/${id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
            <img src={logo} alt="Tindev"></img> 
             <GiDiceTwentyFacesTwenty></GiDiceTwentyFacesTwenty>
            <input
            placeholder="Digite seu e-mail"
            value={username}
            onChange={ e => setUsername(e.target.value)}
            />
            <input
            placeholder="Digite sua senha"
            value={senha}
            type="password"
            onChange={ e => setSenha(e.target.value)}
            />
            <button type="submit">Enviar</button>
            </form>
            
        </div>
    );
}


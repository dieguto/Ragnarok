import React, { useEffect, useState } from 'react';
import './css/Main.css';
import api from '../services/api';

import logo from '../assets/logo.png'

import {MdCheck,MdClose } from 'react-icons/md'

// o react router dom tem uma propriedade chamada match 
// dentro desse match eu tenho todos os parametros que forem passados para a rota
export default function Main( {match}) {
    const [users, setUsers] = useState([]);


    // primeiro recebe qual função quer executar depois quando quer executar
    useEffect(() => {
        async function loadUsers(){
            const response = await api.get('/usuario', {
                headers: {
                    usuario: match.params.id,
                 }
            })
            setUsers(response.data);
            
        }
        loadUsers();
    }, [match.params.id])
    
    // toda ação que vai partir da ação do usuario geralmente começa com handle
    async function handleLike(id){
        console.log('like', id)
    }

    async function handleDislike(id){
        console.log('dislike', id)
    }

    return(
        <div className="main-container"> 
            <img src={logo} alt="logo"></img>
            <ul>
                {/* map serve para percorrer o array */}
                {users.map(user => (
                     <li key={user.id}>
                     <img src="https://avatars0.githubusercontent.com/u/44759538?s=400&u=f30fb21ad473f32f35d4eaa170fd83a5410bc997&v=4"></img>
                     <footer>
                         <strong>Diego</strong>
                         <p>Astronauta que ama pizza
                         </p>
                     </footer>
                     <div className="buttons">
                         <button type="button" onClick={() => handleDislike(user.id)}>
                             <MdCheck></MdCheck>
                         </button>
                         <button type="button" onClick={() => handleLike(user.id)}>
                             <MdClose></MdClose>
                         </button>
                     </div>
                 </li>
                ))}
               
            </ul>
            
        </div>
        
    );
}
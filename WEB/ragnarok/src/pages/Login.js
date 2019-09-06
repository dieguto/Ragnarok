import React, { useState }  from 'react';

import api from '../services/api';
 
export default function Login(){

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
    console.log(id)
    console.log(response)

 
    window.location.href = `/usuario/${id}`;
  }

    return(
        <div className="dropdown"> 
            <div className="dropdown-menu dropdown-menu-right">
                <form className="px-4 py-3" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                    type="email" 
                    value={username} 
                    onChange={e => 
                    setUsername(e.target.value)} 
                    className="form-control" 
                    id="exampleDropdownFormEmail1" 
                    placeholder="email@example.com"/>
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input 
                    type="password" 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)} 
                    className="form-control" 
                    placeholder="******" />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn text-center btn-outline-warning mt-4">Entrar</button>
                </div>
                
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Novo por aqui? Inscreva-se</a>
            </div>
            </div>
    )
}
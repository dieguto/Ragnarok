import React, { Component, useState, Fragment }  from 'react';

import api from '../services/api';
import $ from 'jquery';
import './css/Cadastro.css'
import InputFormulario from '../components/inputFormulario';

 

export class FormularioLogin extends Component{

    constructor(){
        super();
        this.state = {email:'', senha: ''};
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.enviarForm = this.enviarForm.bind(this);
    }

    setEmail(event){
        this.setState({email:event.target.value});
        console.log(this.state.email)
    }

    setSenha(event){
        this.setState({senha:event.target.value});
        console.log(this.state.senha)
    }

    enviarForm(event){
        event.preventDefault();

        $.ajax({
            url: 'http://localhost:3107/login/usuario',
            contentType: 'application/json',
            dataType:'json',
            type:'post',
            data: JSON.stringify(
                {
                    email:this.state.email,
                    senha:this.state.senha
                }
            ),
            success: function(resposta){
                console.log(resposta)
                const { id } = resposta.usuario;
                window.location.href = `/usuario/${id}`;
            }.bind(this)

        })

    }

    // async handleSubmit(e) {
    //     e.preventDefault();

    // // await = diz para esperar retornar da api
    // const response = await api.post('/login/usuario', {
    //     email : username,
    //     senha
    // })

    // const { id } = response.data.usuario;
    // console.log(id)
    // console.log(response)

 
    // window.location.href = `/usuario/${id}`;
    render(){
        return(
            <div className="login-container">
                <form onSubmit={this.enviarForm} method="post">   
                    <h1>Login</h1> 
                <div>
                    <div>
                        <label className="form-check-label">E-mail:</label>
                        <input className="form-control" type="email" id="email" name="email" placeholder="batatinhaxpto@senaisp.com" value={this.state.email} onChange={this.setEmail} required></input>
                        
                    </div>
                    {/* <InputFormulario
                        classLabel="form-check-label 2-mr"
                        label="email: "
                        className="form-control"
                        id="email"
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.setEmail}
                        placeholder="gabrieldomangue@gmail.com"
                       >
                    </InputFormulario> */}
                    <div>
                        <label className="form-check-label">Senha:</label>
                        <input className="form-control" type="password" id="senha" name="senha" placeholder="*****" value={this.state.senha} onChange={this.setSenha} required></input>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-outline-warning" type="submit">Entrar</button>
                    </div>
                </div>
            </form>
            </div>
            
        )
      }
    
}

  



export class LoginBox extends Component{

    render(){
        return(
            <Fragment>
                <FormularioLogin></FormularioLogin>
            </Fragment>
        )
    }
}
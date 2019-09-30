import React, { Component, useState, Fragment }  from 'react';

import api from '../services/api';
import $ from 'jquery';
import './css/Cadastro.css'
import InputFormulario from '../components/inputFormulario';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../actions'




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
        // const counter = useSelector(state => state.counter);
        // const isLogged = useSelector(state => state.isLogged);
        // const dispatch = useDispatch();
        $.ajax({
            url: 'http://localhost:3107/auth/login/usuario',
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
                    <div>
                        <label className="form-check-label">Senha:</label>
                        <input className="form-control" type="password" id="senha" name="senha" placeholder="*****" value={this.state.senha} onChange={this.setSenha} required></input>
                    </div>

                    <div className="text-center">
                        
                        <button className="btn btn-outline-warning" disabled={!this.state.email} type="submit">Entrar</button>
                        {/* <button onClick={() => dispatch(increment(5))}>+</button> */}
                        {/* <button onClick={() => dispatch(decrement(5))}>-</button> */}
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
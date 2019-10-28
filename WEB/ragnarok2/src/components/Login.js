import React, {Component} from 'react';
import {browserHistory} from  'react-router';

export default class Login extends Component {

    constructor(props){
        super(props);        
        this.state = {msg:this.props.location.query.msg};
    }

    envia(event){
        event.preventDefault();

        /* é criado a constante requestInfo, por que por padrão o fetch realiza um get
    //     porém, como estamos lidando com dados do usuário, devemos utilizar um POST*/ 
        const requestInfo = {
            method:'POST',
            // body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
            body:JSON.stringify({email:this.login.value,senha:this.senha.value}), //versão para o TCC
            headers:new Headers({
                'Content-type' : 'application/json',
                // 'Authorization' : 'Bearer ' + token 
            })
        };

        fetch('http://localhost:3107/auth/login/usuario',requestInfo) // Versão para o TCC
        // fetch('https://instalura-api.herokuapp.com/api/public/login',requestInfo)
            .then(response => {
                //o "ok" é do proprio response, que retorna um boolean
                if(response.ok) {
                    return response.text();
                } else {
                    // criamos um novo erro, para interromper o fluxo
                    throw new Error('não foi possível fazer o login');
                }
            })
            .then(dadosUsuario => {
                dadosUsuario = JSON.parse(dadosUsuario);
                localStorage.setItem('token', dadosUsuario.token);
                // localStorage.setItem('usuario', JSON.parse(dadosUsuario.usuario));
                browserHistory.push('/');
                //console.log(token)
            })
            
            .catch(error => {
                this.setState({msg:error.message});
            });
    }

    render(){
        return (
            <div className="login-container">
                <h1 className="header-logo">Ragnarok</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}

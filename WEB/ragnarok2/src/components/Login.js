import React, {Component} from 'react';
import {browserHistory} from  'react-router';
import '../css/cadastro-anuncio.css'


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
  
        fetch('http://3.92.51.72:3107/auth/login/usuario',requestInfo) // Versão para o TCC
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
            <>
            <h1 className="header-logo titulo-cadastro-anuncio">Ragnarok</h1>
            <div className="login-container">
                
                
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <label className="form-check-label">E-mail:</label>
                    <input type="text" placeholder="batatinhaxpto@senaisp.com" ref={(input) => this.login = input}/>
                    <label className="form-check-label">Senha:</label>
                    <input type="password" placeholder="5dbni?" ref={(input) => this.senha = input}/>
                    <input className="btn btn-outline-warning"  type="submit" value="Entrar"/>
                </form>
            </div>

            </>
        );
    }
}

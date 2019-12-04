import React , {Component} from 'react';
import {browserHistory} from  'react-router';
import Cleave from 'cleave.js/dist/cleave-react'
import '../css/Cadastro.css';
import '../css/cadastro-anuncio.css';
import { ERRO, Notificacao, INFO, AVISO, PADRAO, CAMPO_VAZIO, SUCESSO, SUCESSO_CADASTRO } from '../Alerta';
import { ToastContainer } from 'react-toastify';
import InputMask from 'react-input-mask';

export default class CadastroUsuario extends Component {

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
            body:JSON.stringify({nome:this.nome.value,email:this.email.value,cep:this.cep.value,senha:this.senha.value}), //versão para o TCC
            headers:new Headers({
                'Content-type' : 'application/json',
                // 'Authorization' : 'Bearer ' + token 
            })
        };
  
        fetch('http://3.92.51.72:3107/usuario',requestInfo) // Versão para o TCC
            .then(response => {
                //o "ok" é do proprio response, que retorna um boolean
                if(response.ok) {
                    Notificacao(SUCESSO, SUCESSO_CADASTRO)
                    return response.text();
                    
                } else {
                    // criamos um novo erro, para interromper o fluxo
                    Notificacao(ERRO, CAMPO_VAZIO)
                    console.log(requestInfo)
                    console.log(response)
                    throw new Error('não foi possível fazer o cadastro');
                }
            })
            .then(dadosUsuario => {
                // dadosUsuario = JSON.parse(dadosUsuario);
                // sessionStorage.setItem('token', dadosUsuario.token);
                // sessionStorage.setItem('usuario', JSON.parse(dadosUsuario.usuario));
                browserHistory.push('/login');
                //console.log(token)
            })
            
            .catch(error => {
                this.setState({msg:error.message});
            });
    }


    render(){
        return(
            <div className="login-container">
                <ToastContainer />
                   
                        <form onSubmit={this.envia.bind(this)} name="formcadastro">   
                                <h1 className="header-logo titulo-cadastro-anuncio">Cadastro</h1> 

                                <span>{this.state.msg}</span>
                                <div>
                                    <label className="form-check-label ">Nome:</label>
                                    <input className="form-control " type="text"  placeholder="Celso Furtado" required ref={(input) => this.nome = input}></input>
                                </div>
                                
                                <div>
                                    <label className="form-check-label">E-mail:</label>
                                    <input className="form-control" type="email"  placeholder="celso@email.com" required ref={(input) => this.email = input}></input>
                                </div>
                                <div>
                                    <label className="form-check-label">Cep:</label>
                                    {/* <Cleave type="text"  required className="form-control" placeholder="06233-085" options={{blocks: [5,3], delimiter:"-", numericOnly:true}} ref={(input) => this.cep = input}></Cleave> */}
                                    <InputMask mask="99999-999"  required className="form-control" placeholder="06233-085"  ref={(input) => this.cep = input} />
                                    {/* <input type="text"  required className="form-control" placeholder="06233-085" maxLength="9" ref={(input) => this.cep = input}></input> */}
                                </div>
                                
                                <div>
                                    <label className="form-check-label">Senha:</label>
                                    <input className="form-control" type="password" placeholder="*******" required ref={(input) => this.senha = input}></input>
                                </div>

                            <div className="text-center">
                                <button className="btn btn-outline-warning" type="submit">Cadastrar</button>
                            </div>
                            
                                
                                
                            
                        </form> 

                    
                </div>
        )
    }


}
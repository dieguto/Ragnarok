import React, {Component, Fragment} from 'react';
import Menu from '../components/Menu';
import $ from 'jquery';
import TrataErros from '../TrataErros';
import PubSub from 'pubsub-js';
import './css/Cadastro.css';
import Cleave from 'cleave.js/dist/cleave-react';


export class FormularioCadastro extends Component{

    constructor(){
        super();
        this.state = {nome:'', email:'', cep:'', senha:''};
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setCep = this.setCep.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.enviarForm = this.enviarForm.bind(this);
    }

    setNome(event){
        this.setState({nome:event.target.value});
        console.log(this.state.nome)
    }

    setEmail(event){
        this.setState({email:event.target.value});
        console.log(this.state.email)
    }

    setCep(event){
        this.setState({cep:event.target.value});
        console.log(this.state.cep)
    }

    setSenha(event){
        this.setState({senha:event.target.value});
        console.log(this.state.senha)
    }

    

    enviarForm(event){
        // const [username, setUsername] = useState('');
        // const [senha, setSenha] = useState('');

        event.preventDefault();

        $.ajax({
            url: 'http://localhost:3107/usuario',
            contentType: 'application/json',
            dataType:'json',
            type:'post',
            data: JSON.stringify(
                {
                    nome:this.state.nome,
                    email:this.state.email,
                    cep:this.state.cep,
                    senha:this.state.senha
                }
            ),
            success: function(resposta){
                console.log(resposta)
            }.bind(this),
            error:function(resposta){
                console.log(resposta)
               
                if (resposta.status === 400){
                    new TrataErros().publicaErros(resposta.responseJSON)
                }

            },
            beforeSend: function(){
                PubSub.publish("limpar-erros", {})
            }
        })

    }



    render(){
        return(
                <div className="login-container">
                   
                        <form onSubmit={this.enviarForm} method="post" name="formcadastro">   
                                <h1>Cadastro</h1> 
                            

                                
                                <div>
                                    <label className="form-check-label ">Nome:</label>
                                    <input className="form-control " type="text" id="nome" name="nome" value={this.state.nome} onChange={this.setNome} placeholder="Guilherme caneiro" required></input>
                                </div>
                                <div>
                                    <label className="form-check-label">Cep:</label>
                                    <Cleave type="text" id="cep" name="cep" value={this.state.cep} onChange={this.setCep} required className="form-control" placeholder="06233-085" options={{blocks: [5,3], delimiter:"-", numericOnly:true}}></Cleave>
                                </div>
                                <div>
                                    <label className="form-check-label">email:</label>
                                    <input className="form-control" type="email" id="email" name="email" value={this.state.email} onChange={this.setEmail} placeholder="guimanchaverde@email.com" required></input>
                                </div>
                                
                                <div>
                                    <label className="form-check-label">Senha:</label>
                                    <input className="form-control" type="password" id="senha" name="senha" value={this.state.senha} onChange={this.setSenha} placeholder="*******" required></input>
                                </div>

                            <div className="text-center">
                                <button className="btn btn-outline-warning" disabled={!this.state.email} type="submit">Cadastrar</button>
                            </div>
                            
                                
                                
                            
                        </form> 

                    
                </div>
                            
        )
        
    }
    
}

export class UsuarioBox extends Component{

    render(){
        return(
            <Fragment>
                <FormularioCadastro></FormularioCadastro>
            </Fragment>
           
        )
    }

    
}
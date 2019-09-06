import React from 'react';
import Menu from '../components/Menu';
import $ from 'jquery';

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

            }
        })

    }

    render(){
        <div>
            <div className="dropdown">
                <form onSubmit={this.enviarForm} method="post">
                    <h1>Cadastro</h1>
                    <label>Nome:</label>
                    <input type="text"></input>
                    <label>Cep:</label>
                    <input type="text"></input>
                    <label>email:</label>
                    <input type="text"></input>
                    <label>Senha:</label>
                    <input type="text"></input>
                    <button type="submit">Enviar</button>
                </form>             
            </div>
        </div>
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
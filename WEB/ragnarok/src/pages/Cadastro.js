import React, {Component, Fragment} from 'react';
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
                alert("cadastrou" + resposta)
            }.bind(this),
            error:function(resposta){
                console.log(resposta)
               

            }
        })

    }



    render(){
        return(
            <div>
            <div className="dropdown">
                <form onSubmit={this.enviarForm} method="post">
                    <h1>Cadastro</h1>
                    <label class="form-check-label">Nome:</label>
                    <input class="form-control" type="text" id="nome" name="nome" value={this.state.nome} onChange={this.setNome}></input>
                    <label class="form-check-label">Cep:</label>
                    <input class="form-control" type="text" id="cep" name="cep" value={this.state.cep} onChange={this.setCep}></input>
                    <label class="form-check-label">email:</label>
                    <input class="form-control" type="text" id="email" name="email" value={this.state.email} onChange={this.setEmail}></input>
                    <label class="form-check-label">Senha:</label>
                    <input class="form-control" type="text" id="senha" name="senha" value={this.state.senha} onChange={this.setSenha}></input>
                    <button className="btn btn-warning" type="submit">Enviar</button>
                </form>             
            </div>
        </div>
        )
        
    }
    
}

export class UsuarioBox extends Component{

    render(){
        return(
            <Fragment>
                <FormularioCadastro></FormularioCadastro>
                <h1>Eae</h1>
            </Fragment>
           
        )
    }

    
}
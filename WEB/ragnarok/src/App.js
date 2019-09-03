import React,{Component} from 'react';
import logo from './logo.svg';

import $ from 'jquery';
import './css/pure-min.css';
import './css/bootstrap.min.css';
import './App.css';
import PubSub from 'pubsub-js';
import InputFormulario from './components/inputFormulario';
import InputBotao from './components/Botao';


class App extends Component {

  constructor(){
    super();
    this.state = {email:'', senha:''};
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.enviarForm = this.enviarForm.bind(this);
  }

  setEmail(event){
    this.setState({email:event.target.value});
  }

  setSenha(event){
    this.setState({senha:event.target.value});
  }


  enviarForm(event){
    event.preventDefault();

   

    $.ajax({
      url: 'http://localhost:3009/login/usuario',
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

        alert("logou" + JSON.stringify(resposta))
      

      }.bind(this)

    })
  }

  render(){
    return (
      <div className="App">
        <div className="header">
        <div className="navbar navbar-light bg-dark">
          <a className="navbar-brand text-warning">Ragnarok</a>
            <form className="form-inline" onSubmit={this.enviarForm} method="post">
              {/* <input className="form-control mr-sm-2" type="text" placeholder="Usuário" aria-label="Pesquisar"/> */}
              
              
    
              
              {/* <InputBotao
              id="logar"
              className="btn btn-outline-warning"
              type="submit"
              label="Entrar">
              
              </InputBotao> */}

              <div className="dropdown">
                <button className="btn btn-outline-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Entrar
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <form className="px-4 py-3">
                    <div className="form-group">
                      <label for="exampleDropdownFormEmail1">Email</label>
                      <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"/>
                    </div>
                    <div className="form-group">
                      <label for="exampleDropdownFormPassword1">Senha:</label>
                      <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="******" />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn text-center btn-outline-warning mt-4">Entrar</button>
                    </div>
                    
                  </form>
                  <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">Novo por aqui? Inscreva-se</a>
                </div>
              </div>

            </form>
        </div>
        </div>
      </div>
    );
  }
}

export default App;

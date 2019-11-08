import React,{Component} from 'react';
import '../css/edicao-usuario.css';
import api from '../services/api';
import UserIcon from '../assets/user.svg'

export default class EditarUsuario extends Component{

    constructor(){
        super();
        this.state = { infos: []}
    }

    componentDidMount(){
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        const token = sessionStorage.getItem('token');
        console.log(token);

        const requestInfo ={
            
            headers:new Headers({
                'Content-type' : 'application/json',
                'Authorization' : 'Bearer ' + token 
            })
         
        }

        fetch(`${api}/usuario/${usuario.id}/completo`, requestInfo)
        .then(response => response.json())
        .then(infos => {
            console.log(infos)
            this.setState({infos:infos})

        })
    }

    render(){

        


        return(
            <div id="container">
                <div class="header1">
                    Minha Conta
                </div>
                <div class="header2">
                    Meus Anuncios
                </div>
                <div class="card background-333333 texto-laranja card-usuario">
                
                    <div class="card-body">
                        <div class="row">
                            <div class="col-3 d-flex align-content-center flex-wrap"><img src={UserIcon} class="imagem-usuario rounded-circle" alt="" title=""/></div>
                            <div class="col-6">
                                <form>
                                    <div class="form-group">
                                        <label for="">Nome do Usuário:</label>
                                        <input type="text" class="form-control" id="" placeholder="Digite o nome de usuario" ref={(input) => this.state.infos.nome = input} value={this.state.infos.nome}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="">E-mail:</label>
                                        <input type="text" class="form-control" id="" placeholder="Digite seu e-mail" ref={(input) => this.state.infos.email = input} value={this.state.infos.email}/>
                                    </div>  
                                    <div class="form-group">
                                        <label for="">CEP:</label>
                                        <input type="text" class="form-control" id="" placeholder="00000-000" ref={(input) => this.state.infos.cep = input} value={this.state.infos.cep}/>
                                    </div>  
                                    <div class="form-group">
                                        <label for="">Senha:</label>
                                        <input type="password" class="form-control" id="" placeholder="batatinha"/>
                                    </div>  
                                </form>
                            </div>
                            <div class="col-3 d-flex align-self-bottom flex-column">
                                <button type="button" class="btn btn-salvar mt-auto mr-auto ml-auto">Salvar</button>
                                <button type="button" class="btn btn-cancelar  mr-auto ml-auto">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
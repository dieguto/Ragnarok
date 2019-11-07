import React,{Component} from 'react';
import '../css/edicao-usuario.css';

export default class EditarUsuario extends Component{
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
                            <div class="col-3 d-flex align-content-center flex-wrap"><img src="img/power.jpg" class="imagem-usuario rounded-circle" alt="" title=""/></div>
                            <div class="col-6">
                                <form>
                                    <div class="form-group">
                                        <label for="">Nome do Usuário:</label>
                                        <input type="text" class="form-control" id="" placeholder="Digite o nome de usuario"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="">E-mail:</label>
                                        <input type="text" class="form-control" id="" placeholder="Digite seu e-mail"/>
                                    </div>  
                                    <div class="form-group">
                                        <label for="">CEP:</label>
                                        <input type="text" class="form-control" id="" placeholder="00000-000"/>
                                    </div>  
                                    <div class="form-group">
                                        <label for="">Senha:</label>
                                        <input type="password" class="form-control" id="" placeholder="batatinha"/>
                                    </div>  
                                </form>
                            </div>
                            <div class="col-3 d-flex align-self-bottom flex-column">
                                <button type="button" class="btn btn-cancelar mt-auto mr-auto ml-auto">Cancelar</button>
                                <button type="button" class="btn btn-salvar mr-auto ml-auto">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
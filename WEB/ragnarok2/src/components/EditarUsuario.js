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
                
                <div className="row mb-5">
                    <div className="col-10 mr-auto ml-auto">
                        <div className="header1">
                            <span className="align-middle">Minha Conta</span>
                        </div>
                        <div class="header2">
                            <span className="align-middle">Meus Anuncios</span>
                        </div>
                        <div className="card background-333333 texto-laranja card-usuario">
                            <div className="card-body">
                                <div class="row">
                                    <div className="col-3 d-flex align-content-center flex-wrap"><img src={UserIcon} class="imagem-usuario rounded-circle" alt="" title=""/></div>
                                    <div className="col-6">
                                        <form>
                                            <div className="form-group">
                                                <label for="">Nome do Usuário:</label>
                                                <input type="text" className="form-control" id="" placeholder="Digite o nome de usuario" ref={(input) => this.nome = input} value={this.state.infos.nome}/>
                                            </div>
                                            <div class="form-group">
                                                <label for="">E-mail:</label>
                                                <input type="text" className="form-control" id="" placeholder="Digite seu e-mail" ref={(input) => this.email = input} value={this.state.infos.email}/>
                                            </div>  
                                            <div class="form-group">
                                                <label for="">CEP:</label>
                                                <input type="text" className="form-control" id="" placeholder="00000-000" ref={(input) => this.cep = input} value={this.state.infos.cep}/>
                                            </div>  
                                            <div class="form-group">
                                                <label for="">Senha:</label>
                                                <input type="password" className="form-control" id="" placeholder="batatinha"/>
                                            </div>  
                                        </form>
                                    </div>
                                    <div className="col-3 d-flex align-self-bottom flex-column">
                                        <button type="button" className="btn btn-salvar mt-auto mr-auto ml-auto">Salvar</button>
                                        <button type="button" className="btn btn-cancelar  mr-auto ml-auto">Cancelar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>      

            </div>

            // <div id="container">
            //     <div className="header1">
            //         Minha Conta
            //     </div>
            //     <div className="header2">
            //         Meus Anuncios
            //     </div>
            //     <div className="card background-333333 texto-laranja card-usuario">
            //         <div className="row">
            //             <div className="col-4 tab1 text-center"><img className="icone-tab1" src="img/jogo.png" alt="" title=""/></div>
            //             <div className="col-4 tab2 text-center"><img className="icone-tab2" src="img/acessorio.png" alt="" title=""/></div>
            //             <div className="col-4 tab3 text-center"><img className="icone-tab2" src="img/console.png" alt="" title=""/></div>
            //         </div>
            //         <div className="card-body">
            //             <div className="row pl-4">
            //                 <div className="col-5 ml-5 mr-5">
            //                     <div className=" background-222222 card-anuncio borda-20px">
            //                         <div className="card-header texto-branco text-center">O bom de guerra</div>
            //                         <div className="card-body"> 
            //                             <div className="row">
            //                                 <div className="col-12">
            //                                     <div className="card card-anuncio sem-borda bg-transparent">
            //                                         <div className="card-body">
            //                                             <img src="img/god-of-war.jpg" className="card-img borda-20px"/>
            //                                         </div>
            //                                     </div>
            //                                 </div>
            //                             </div>
                                        
            //                         </div>
            //                         <div className="card-footer">
            //                             <button className="btn btn-leia-mais" data-toggle="modal" data-target=".modal">Leia Mais</button>
            //                             {/* Modal */}
            //                             <div className="modal fade" role="dialog">
            //                                 <div className="modal-dialog modal-dialog-centered modal-lg">
            //                                     {/* Conteúdo do modal*/}
            //                                     <div className="modal-content borda-20px background-222222">
                                        
            //                                         {/* Cabeçalho do modal */}
            //                                         <div className="modal-header texto-laranja background-333333 border-0">
            //                                             <span className="modal-title text-center ml-auto">O Bom de guerra</span>
            //                                             <button type="button" className="close texto-laranja border-0 btn-icone-fechar" data-dismiss="modal">&times;</button>
            //                                         </div>
                                        
            //                                         {/* Corpo do modal */}
            //                                         <div className="modal-body background-222222 border-0">
            //                                         <div className="row">
            //                                             <div className="col-11 mr-auto ml-auto">
            //                                                     <div className="row">
            //                                                         <div className="col-6"><img src="img/god-of-war.jpg" className="img-fluid" alt="" title=""/></div>
            //                                                         <div className="col-6 mt-3">
            //                                                             <p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p>
            //                                                             <p className="texto-branco"><span className="texto-laranja">Cep:</span> 06612-120  </p>
            //                                                         </div>
            //                                                     </div>
            //                                                     <div className="row mt-4">
            //                                                         <div className="col-8"><p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p></div>
            //                                                     </div>
            //                                             </div>
            //                                         </div>
            //                                         </div>
                                        
            //                                         {/* Rodapé do modal */}
            //                                         <div className="modal-footer background-333333 border-0">
            //                                             <button type="button" className="btn background-222222 texto-laranja mr-auto btn-iniciar-chat"><img src="img/chat.png" alt="" title=""/>Iniciar Chat</button>
            //                                             <button type="button" className="btn background-222222 texto-laranja ml-auto btn-fechar" data-dismiss="modal">Fechar</button>
            //                                         </div>
                                        
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                             {/* Fim Modal */}
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div className="col-5 ml-4">
            //                     <div className=" background-222222 card-anuncio borda-20px">
            //                         <div className="card-header texto-branco text-center">O bom de guerra</div>
            //                         <div className="card-body"> 
            //                             <div className="row">
            //                                 <div className="col-12">
            //                                     <div className="card card-anuncio sem-borda bg-transparent">
            //                                         <div className="card-body">
            //                                             <img src="img/god-of-war.jpg" className="card-img borda-20px"/>
            //                                         </div>
            //                                     </div>
            //                                 </div>
            //                             </div>                                
            //                         </div>
            //                         <div className="card-footer">
            //                             <button className="btn btn-leia-mais" data-toggle="modal" data-target=".modal">Leia Mais</button>
            //                             {/* Modal */}
            //                             <div className="modal fade" role="dialog">
            //                                 <div className="modal-dialog modal-dialog-centered modal-lg">
            //                                     {/* Conteúdo do modal */}
            //                                     <div className="modal-content borda-20px background-222222">
                                        
            //                                         {/* Cabeçalho do modal */}
            //                                         <div className="modal-header texto-laranja background-333333 border-0">
            //                                             <span className="modal-title text-center ml-auto">O Bom de guerra</span>
            //                                             <button type="button" className="close texto-laranja border-0 btn-icone-fechar" data-dismiss="modal">&times;</button>
            //                                         </div>
                                        
            //                                         {/* Corpo do modal */}
            //                                         <div className="modal-body background-222222 border-0">
            //                                         <div className="row">
            //                                             <div className="col-11 mr-auto ml-auto">
            //                                                     <div className="row">
            //                                                         <div className="col-6"><img src="img/god-of-war.jpg" className="img-fluid" alt="" title=""/></div>
            //                                                         <div className="col-6 mt-3">
            //                                                             <p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p>
            //                                                             <p className="texto-branco"><span className="texto-laranja">Cep:</span> 06612-120  </p>
            //                                                         </div>
            //                                                     </div>
            //                                                     <div className="row mt-4">
            //                                                         <div className="col-8"><p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p></div>
            //                                                     </div>
            //                                             </div>
            //                                         </div>
            //                                         </div>
                                        
            //                                         {/* Rodapé do modal */}
            //                                         <div className="modal-footer background-333333 border-0">
            //                                             <button type="button" className="btn background-222222 texto-laranja mr-auto btn-iniciar-chat"><img src="img/chat.png" alt="" title=""/>Iniciar Chat</button>
            //                                             <button type="button" className="btn background-222222 texto-laranja ml-auto btn-fechar" data-dismiss="modal">Fechar</button>
            //                                         </div>
                                        
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                             {/* Fim Modal */}
            //                         </div>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            
        )
    }
}
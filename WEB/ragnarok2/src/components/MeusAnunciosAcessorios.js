import React,{Component} from 'react';
import {Link} from 'react-router';

import '../css/meus-anuncios.css';

import api from '../services/api';

import IconeJogo from '../assets/jogo.png';
import IconeAcessorio from '../assets/acessorio.png';
import IconeConsole from '../assets/console.png';

export default class MeusAnuncios extends Component{

    constructor(){
        super();
        this.state = {anuncios: []}
    }

    componentDidMount(){
        fetch( `${api}/anuncios/usuario/1/1/0/0/0/0/0/0/0/0`)
        .then(response => response.json())
        .then(anuncios => {
            this.setState({anuncios:anuncios})
            console.log(anuncios)
        })        
   }

    buscarAcessorios(){
        
    }

    buscarConsoles(){

    }   

    render(){    

        return(

            <div id="container">
                <div className="row mb-5">
                    <div className="col-10 mr-auto ml-auto">
                        <Link to="/editarUsuario">
                            <div className="header1">
                                Minha Conta
                            </div>
                        </Link>
                        <Link to="/meusAnuncios">
                            <div className="header2">
                                Meus Anuncios
                            </div>
                        </Link>
                        <div className="card background-333333 texto-laranja card-usuario">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">                
                                        <Link to="/meusAnuncios">
                                            <div className="col-4 tab1 text-center"><img className="icone-tab1" src={IconeJogo} alt="Icone Jogos" title="Icone Jogos"/></div>
                                        </Link>                        
                                        <Link to="/meusAnunciosAcessorios">
                                            <div className="col-4 tab2 text-center"><img className="icone-tab2" src={IconeAcessorio} alt="Icone Acessorio" title="Icone Acessorio"/></div>
                                        </Link>
                                        <Link to="/meusAnunciosConsoles">
                                            <div className="col-4 tab3 text-center"><img className="icone-tab2" src={IconeConsole} alt="Icone Console" title="Icone Console"/></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row pl-4">
                                    <div className="col-5 ml-5 mr-5">
                                        <div className=" background-222222 card-anuncio borda-20px">
                                            <div className="card-header texto-branco text-center">O bom de guerra</div>
                                            <div className="card-body"> 
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card card-anuncio sem-borda bg-transparent">
                                                            <div className="card-body">
                                                                <img src="img/god-of-war.jpg" className="card-img borda-20px"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-leia-mais" data-toggle="modal" data-target=".modal">Leia Mais</button>
                                                {/* Modal */}
                                                <div className="modal fade" role="dialog">
                                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                                        {/* Conteúdo do modal*/}
                                                        <div className="modal-content borda-20px background-222222">
                                                
                                                            {/* Cabeçalho do modal */}
                                                            <div className="modal-header texto-laranja background-333333 border-0">
                                                                <span className="modal-title text-center ml-auto">O Bom de guerra</span>
                                                                <button type="button" className="close texto-laranja border-0 btn-icone-fechar" data-dismiss="modal">&times;</button>
                                                            </div>
                                                
                                                            {/* Corpo do modal */}
                                                            <div className="modal-body background-222222 border-0">
                                                            <div className="row">
                                                                <div className="col-11 mr-auto ml-auto">
                                                                        <div className="row">
                                                                            <div className="col-6"><img src="img/god-of-war.jpg" className="img-fluid" alt="" title=""/></div>
                                                                            <div className="col-6 mt-3">
                                                                                <p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p>
                                                                                <p className="texto-branco"><span className="texto-laranja">Cep:</span> 06612-120  </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-4">
                                                                            <div className="col-8"><p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p></div>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                
                                                            {/* Rodapé do modal */}
                                                            <div className="modal-footer background-333333 border-0">
                                                                <button type="button" className="btn background-222222 texto-laranja mr-auto btn-iniciar-chat"><img src="img/chat.png" alt="" title=""/>Iniciar Chat</button>
                                                                <button type="button" className="btn background-222222 texto-laranja ml-auto btn-fechar" data-dismiss="modal">Fechar</button>
                                                            </div>
                                                
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Fim Modal */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 ml-4">
                                        <div className=" background-222222 card-anuncio borda-20px">
                                            <div className="card-header texto-branco text-center">O bom de guerra</div>
                                            <div className="card-body"> 
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card card-anuncio sem-borda bg-transparent">
                                                            <div className="card-body">
                                                                <img src="img/god-of-war.jpg" className="card-img borda-20px"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-leia-mais" data-toggle="modal" data-target=".modal">Leia Mais</button>
                                                {/* Modal */}
                                                <div className="modal fade" role="dialog">
                                                    <div className="modal-dialog modal-dialog-centered modal-lg">
                                                        {/* Conteúdo do modal */}
                                                        <div className="modal-content borda-20px background-222222">
                                                
                                                            {/* Cabeçalho do modal */}
                                                            <div className="modal-header texto-laranja background-333333 border-0">
                                                                <span className="modal-title text-center ml-auto">O Bom de guerra</span>
                                                                <button type="button" className="close texto-laranja border-0 btn-icone-fechar" data-dismiss="modal">&times;</button>
                                                            </div>
                                                
                                                            {/* Corpo do modal */}
                                                            <div className="modal-body background-222222 border-0">
                                                            <div className="row">
                                                                <div className="col-11 mr-auto ml-auto">
                                                                        <div className="row">
                                                                            <div className="col-6"><img src="img/god-of-war.jpg" className="img-fluid" alt="" title=""/></div>
                                                                            <div className="col-6 mt-3">
                                                                                <p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p>
                                                                                <p className="texto-branco"><span className="texto-laranja">Cep:</span> 06612-120  </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-4">
                                                                            <div className="col-8"><p className="texto-branco"><span className="texto-laranja">Nome:</span> Meu tênis</p></div>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                            </div>
                                                
                                                            {/* Rodapé do modal */}
                                                            <div className="modal-footer background-333333 border-0">
                                                                <button type="button" className="btn background-222222 texto-laranja mr-auto btn-iniciar-chat"><img src="img/chat.png" alt="" title=""/>Iniciar Chat</button>
                                                                <button type="button" className="btn background-222222 texto-laranja ml-auto btn-fechar" data-dismiss="modal">Fechar</button>
                                                            </div>
                                                
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Fim Modal */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        )
    }
}
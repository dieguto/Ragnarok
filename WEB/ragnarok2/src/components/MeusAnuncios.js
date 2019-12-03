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
        const usuario = JSON.parse(sessionStorage.getItem('usuario'));
        const token = sessionStorage.getItem('token');
        console.log(token);

        const requestInfo ={
            
            headers:new Headers({
                'Content-type' : 'application/json',
                'Authorization' : 'Bearer ' + token 
            })
         
        }
        
        fetch( `${api}/anuncios/usuario/${usuario.id}/1/0/0/1/100/0/0/9999/asc`)
        .then(response => response.json())
        .then(anuncios => {
            this.setState({anuncios:anuncios})
            console.log(anuncios)
        })        
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
                                        <div className="col-4 tab1 text-center"><img className="icone-tab1" src={IconeJogo} alt="Icone Jogos" title="Icone Jogos"/></div>
                                        <div className="col-4 tab2 text-center"><img className="icone-tab2" src={IconeAcessorio} alt="Icone Acessorio" title="Icone Acessorio"/></div>
                                        <div className="col-4 tab3 text-center"><img className="icone-tab2" src={IconeConsole} alt="Icone Console" title="Icone Console"/></div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row pl-4">
                                {
                                    this.state.anuncios.map(
                                        anuncios => 

                                        <div className="col-5 ml-5 mr-5">
                                            <div className=" background-222222 card-anuncio borda-20px">
                                                {
                                                    function(){
                                                        // console.log(anuncios.is_jogo)
                                                        if(anuncios.genero){
                                                            return(
                                                                <>
                                                                    <div className="card-header texto-branco text-center">{anuncios.info_rawg.jogo.nome}</div>
                                                                    {/* <div key={anuncios.genero.id_genero} className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div> */}
                                                                </>
                                                            );
                                                        }
                                                    }()
                                                }
                                                {/* <div className="card-header texto-branco text-center">O bom de guerra</div> */}
                                                <div className="card-body"> 
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="card card-anuncio sem-borda bg-transparent">
                                                                <div className="card-body">
                                                                    {
                                                                        function(){
                                                                            if(typeof anuncios.info_rawg.jogo.imagem_fundo != 'null'){
                                                                                return (
                                                                                    <img src={anuncios.info_rawg.jogo.imagem_fundo} alt={anuncios.info_rawg.jogo.nome} title={anuncios.info_rawg.jogo.nome} className="card-img borda-20px"></img>
                                                                                );
                                                                            }
                                                                        }()
                                                                    }
                                                                    {/* <img src="img/god-of-war.jpg" className="card-img borda-20px"/> */}
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

                                    )
                                }
                                    
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
import React,{Component, useState} from 'react';
import {Link} from 'react-router';

import IconeUser from '../assets/user.svg';
import IconChat from '../assets/chat.png'
import GOW from '../assets/god-of-war.jpg';

import api from '../services/api';
import Carousel from 'nuka-carousel';
import '../css/cadastro-anuncio.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import 'jquery-nice-select/js/fastclick';
// import 'jquery-nice-select/js/jquery';
// import 'jquery-nice-select/js/jquery.nice-select';
// import 'jquery-nice-select/js/prism';

// import Select from '@material-ui/core/Select';
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';

// console.log(api)

export default class Anuncio extends Component {

    constructor(){
        super();
        this.state = {anuncios: [], showModal: false}
        this.abrirModal = this.abrirModal.bind(this)        
        this.cont = 0;
    }

    abrirModal(){
        this.setState({showModal:!this.state.modal})
        // this.setState({abrirmodal:true}) 
        console.log(this.state.modal)
    }

    componentDidMount(){
         fetch( `${api}/anuncios/todos/1/0/1/100/distancia/0/9999/asc`)
         .then(response => response.json())
         .then(anuncios => {
             this.setState({anuncios:anuncios})
             console.log(anuncios)
         })
    }


    render(){
        return(
            <>
             <div id="feed">
                <h2 className="feed-titulo">Feed</h2>
                <div className="row caixa-select">
                    <div className="col-4 ml-auto mr-5">
                        <div className="row">
                            <div className="col-6">
                                {/* <InputLabel id="">Anúncios por página</InputLabel>
                                <Select labelId="label" id="" value="">
                                    <MenuItem value="">Anúncios por página</MenuItem>
                                    <MenuItem value="">10</MenuItem>
                                    <MenuItem value="">15</MenuItem>
                                    <MenuItem value="">20</MenuItem>
                                </Select> */}
                            </div>
                            <div className="col-6">
                                {/* <Select labelId="label" id="" value="">
                                    <MenuItem value="" selected disabled>Ordem</MenuItem>
                                    <MenuItem value="">Preço Decrescente</MenuItem>
                                    <MenuItem value="">Preço Crescente</MenuItem>
                                    <MenuItem value="">Alfabética A-Z</MenuItem>
                                </Select> */}
                            </div>
                        </div>                        
                    </div>
                </div>
                {
                    this.state.anuncios.map(
                        anuncios => 

                            <div className="row" key={anuncios.id_anuncio}>
                                <div className="col-1"></div>
                                <div className="col-10">
                                    <div className="card card-anuncio">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-9"><img src={IconeUser} alt="Icone Usuario" title="Icone Usuario" className="rounded-circle icone-usuario"/> <span className="nome-usuario align-middle feed-titulo" >{anuncios.usuario.nome}</span></div>
                                                {
                                                    function(){
                                                        // console.log(anuncios.is_jogo)
                                                        if(anuncios.genero){
                                                            return(
                                                                <>
                                                                <div key={anuncios.genero.id_genero} className="col-1 align-self-center"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div>
                                                                {/* <div key={anuncios.genero.id_genero} className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div> */}
                                                                </>
                                                            );
                                                        }
                                                    }()
                                                }
                                                {
                                                    function(){
                                                        // console.log(anuncios.is_jogo)
                                                        if(anuncios.genero){
                                                            return(
                                                                <>
                                                                <div className="col-1 align-self-center"><span className="badge badge-pill genero-anuncio">{anuncios.distancia}</span></div>
                                                                {/* <div key={anuncios.genero.id_genero} className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div> */}
                                                                </>
                                                            );
                                                        }
                                                    }()
                                                }
                                                {/* <div className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div> */}
                                            </div>
                                            
                                        </div>
                                        <div className="card-body"> 
                                            <div className="row">
                                                <div className="col-1"></div>
                                                <div className="col-10">
                                                    <div className="card card-anuncio sem-borda">
                                                        {
                                                            function(){
                                                                // console.log(anuncios.info_rawg)
                                                                if(anuncios.info_rawg){
                                                                    return(
                                                                        <div className="card-header text-center sem-borda">{anuncios.info_rawg.jogo.nome}</div>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <div className="card-header text-center sem-borda">{anuncios.titulo}</div>
                                                                    ); 
                                                                }
                                                            }() 
                                                        }
                                                       
                                                        <div className="card-body card-body-anuncio">
                                                            {
                                                               function(){
                                                                // console.log(anuncios.info_rawg)
                                                                // console.log(api + anuncios.c_fotos)
                                                                if(anuncios.info_rawg){
                                                                    return(
                                                                        // <img src={anuncios.info_rawg.jogo.imagem_fundo} className="card-img borda-20px"/>
                                                                        
                                                                        <Carousel 
                                                                          renderCenterLeftControls={({ previousSlide }) => (
                                                                            <button className="d-none" onClick={previousSlide}></button>
                                                                          )}
                                                                          renderCenterRightControls={({ nextSlide }) => (
                                                                            <button className="d-none" onClick={nextSlide}></button>
                                                                          )}>
                                                                            {/* <img src={anuncios.info_rawg.jogo.imagem_fundo} className="card-img card-img-anuncio"></img> */}
                                                                            {
                                                                                function(){
                                                                                    if(typeof anuncios.info_rawg.jogo.imagem_fundo != 'null'){
                                                                                        return (
                                                                                            <img src={anuncios.info_rawg.jogo.imagem_fundo} alt={anuncios.info_rawg.jogo.nome} title={anuncios.info_rawg.jogo.nome} className="card-img card-img-anuncio"></img>
                                                                                        );
                                                                                    }
                                                                                }()
                                                                            }

                                                                            {                                
                                                                                function(){
                                                                                    console.log(anuncios.info_rawg.jogo.video)
                                                                                    if(anuncios.info_rawg != null){
                                                                                        if(anuncios.info_rawg.jogo.video){
                                                                                            return (
                                                                                                <video controls poster={anuncios.info_rawg.jogo.preview_video} className="card-img card-img-anuncio align-middle">
                                                                                                    <source src={anuncios.info_rawg.jogo.video} type="video/mp4"></source>
                                                                                                </video>
                                                                                            );
                                                                                        }
                                                                                    }
                                                                                    
                                                                                }()
                                                                            }

                                                                            
                                                                            
                                                                            {
                                                                                function(){
                                                                                    console.log(api + "/" + anuncios.c_fotos[0])
                                                                                    if(anuncios.c_fotos != null){
                                                                                        return anuncios.c_fotos.map(
                                                                                             
                                                                                            fotos => <img src={api + "/" + fotos} alt={"Foto " + anuncios.info_rawg.jogo.nome} title={"Foto " + anuncios.info_rawg.jogo.nome} className="card-img borda-20px card-img-anuncio"/>
                                                                                            
                                                                                        )
                                                                                    }else{
                                                                                        return(
                                                                                             
                                                                                            <p className="text-center align-middle">Não foi cadastrada nenhuma imagem deste anuncio</p>
                                                                                            
                                                                                        )
                                                                                    }
                                                                                }()
                                                                            }
                                                                            {/* <img src={api + "/" + anuncios.c_fotos} className="card-img borda-20px"/> */}
                                                                        </Carousel>
                                                                    );
                                                                } else {
                                                                    console.log(anuncios.c_fotos)
                                                                    return(
                                                                        <Carousel
                                                                          renderCenterLeftControls={({ previousSlide }) => (
                                                                            <button className="d-none" onClick={previousSlide}></button>
                                                                          )}
                                                                          renderCenterRightControls={({ nextSlide }) => (
                                                                            <button className="d-none" onClick={nextSlide}></button>
                                                                          )}>
                                                                            {
                                                                                function(){
                                                                                    console.log(api + "/" + anuncios.c_fotos[0])
                                                                                    return anuncios.c_fotos.map(
                                                                                             
                                                                                        fotos => <img src={api + "/" + fotos} alt={"Foto " + anuncios.titulo} title={"Foto " + anuncios.titulo} className="card-img borda-20px card-img-anuncio"/>
                                                                                        
                                                                                    )
                                                                                }()
                                                                            }
                                                                        </Carousel>                                                                      
                                                                    );
                                                                }  
                                                                
                                                            }() 
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-1"></div>
                                            </div>
                                            
                                        </div>
                                    
                                        <div className="card-footer">
                                            {/* <button className="btn btn-leia-mais" onClick={this.abrirModal}>Leia Mais</button> */}
                                            <button className="btn btn-leia-mais" data-toggle="modal" data-target={".anuncio" + this.cont}>Leia Mais</button>
                                            {/* Modal  */}
                                            <div className={"modal fade anuncio" + this.cont} role="dialog">
                                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                                    {/* Conteúdo do modal */}
                                                    <div className="modal-content borda-20px background-222222">
                                            
                                                        {/* Cabeçalho do modal */}
                                                        <div className="modal-header texto-laranja background-333333 border-0">

                                                            {
                                                                function(){
                                                                    if(anuncios.info_rawg){
                                                                        console.log(anuncios.id_anuncio);
                                                                        return(
                                                                            <span className="modal-title texto-branco text-center ml-auto">{anuncios.info_rawg.jogo.nome}</span>
                                                                        );
                                                                    }else{
                                                                        return(
                                                                            <span className="modal-title texto-branco text-center ml-auto">{anuncios.titulo}</span>
                                                                        ); 
                                                                    }
                                                                }() 
                                                            }
                                                                                                                        
                                                            <button type="button" className="close border-0 btn-icone-fechar" data-dismiss="modal">&times;</button>
                                                        </div>
                                            
                                                        {/* Corpo do modal */}
                                                        <div className="modal-body background-222222 border-0">
                                                        <div className="row">
                                                            <div className="col-11 mr-auto ml-auto">
                                                                    <div className="row">
                                                                        {
                                                                            
                                                                            function(){
                                                                                if(anuncios.info_rawg){
                                                                                    if(typeof anuncios.info_rawg.jogo.imagem_fundo != 'null'){
                                                                                        return(
                                                                                            <div className="col-6"><img src={anuncios.info_rawg.jogo.imagem_fundo} alt={anuncios.info_rawg.jogo.nome} title={anuncios.info_rawg.jogo.nome} class="img-fluid img-modal-anuncio"/></div>
                                                                                        );
                                                                                    }else{
                                                                                        return (
                                                                                            <div className="col-6"><img src={api + "/" + anuncios.c_fotos[0]} alt={"Foto " + anuncios.info_rawg.jogo.nome} title={"Foto " + anuncios.info_rawg.jogo.nome} class="img-fluid img-modal-anuncio"/></div>
                                                                                        );
                                                                                    }
                                                                                } else {
                                                                                    return (
                                                                                        <div className="col-6"><img src={api + "/" + anuncios.c_fotos[0]} alt={"Foto " +  anuncios.titulo} title={"Foto " +  anuncios.titulo} class="img-fluid img-modal-anuncio"/></div>
                                                                                    );
                                                                                }                                                                               
                                                                            }()
                                                                        }
                                                                        <div className="col-6 mt-3">
                                                                            {
                                                                                function(){
                                                                                    return(
                                                                                        <p><span className="texto-laranja">Anunciante:</span> {anuncios.usuario.nome}</p>
                                                                                    ); 
                                                                                }() 
                                                                            }
                                                                            {
                                                                                function(){
                                                                                    return(
                                                                                        <p><span className="texto-laranja">Endereço:</span> {anuncios.usuario.endereco}</p>
                                                                                    ); 
                                                                                }() 
                                                                            }
                                                                            {
                                                                                function(){
                                                                                    return(
                                                                                        <p><span className="texto-laranja">Titulo:</span> {anuncios.titulo}</p>
                                                                                    ); 
                                                                                }() 
                                                                            }
                                                                            {
                                                                                function(){
                                                                                    return(
                                                                                        <p><span className="texto-laranja">Descricao:</span> {anuncios.descricao}</p>
                                                                                    ); 
                                                                                }() 
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mt-2">
                                                                        <div className="col-8">                                                                            
                                                                            {
                                                                                function(){
                                                                                    if(anuncios.preco != null){
                                                                                        return(
                                                                                            <p><span className="texto-laranja">Preço:</span> {anuncios.preco}</p>
                                                                                        ); 
                                                                                    }else{
                                                                                        return(
                                                                                            <p>Jogo apenas para troca</p>
                                                                                        ); 
                                                                                    }                                                                                    
                                                                                }() 
                                                                            }
                                                                            {/* {
                                                                                function(){
                                                                                    return(
                                                                                        <p><span className="texto-laranja">Nome do Jogo:</span> {anuncios.info_rawg.jogo.nome}</p>
                                                                                    ); 
                                                                                }() 
                                                                            } */}
                                                                            {
                                                                                function(){
                                                                                    return(
                                                                                        <p><span className="texto-laranja">Console:</span> {anuncios.console.nome}</p>
                                                                                    ); 
                                                                                }() 
                                                                            }
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                        </div>
                                            
                                                        {/* Rodapé do modal */}
                                                        <div className="modal-footer background-333333 border-0">
                                                            <Link to="/chat">
                                                                <button type="button" className="btn background-222222 texto-laranja mr-auto btn-iniciar-chat" >
                                                                    <img src={IconChat} alt="Icone Chat" title="Icone Chat"/>Iniciar Chat
                                                                </button>
                                                            </Link>                                                            
                                                            <button type="button" className="btn background-222222 texto-laranja ml-auto btn-fechar" data-dismiss="modal">Fechar</button>
                                                        </div>
                                            
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Fim Modal */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-1"></div>
                                <span style={{display:"none"}}>{this.cont = this.cont + 1}</span>
                        </div>
        
                        
                    )
                }
            </div> 
         </>              
        )
    }
}
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

import io from 'socket.io-client';

import $ from 'jquery';


const token = sessionStorage.getItem("token");

const opcoes = {
    query: {
        token: token
    }
};

export const socket = io('http://3.92.51.72:3108/', opcoes);


export default class Anuncio extends Component {

    


    constructor(){
        super();
        this.state = {anuncios: [], showModal: false}
        this.abrirModal = this.abrirModal.bind(this)        
        this.cont = 0;
        socket.on('erro', erro => {
            alert(erro);
        })
    }

    fecharModal(){
        $(".modal").attr("data-dismiss", "modal");
        window.location.href = "/chat"
        //$("#myModal1").attr("data-dismiss", "modal");
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

    iniciarChat(id_anuncio, tipo_chat){


        var iniciar_chat = {

            id_anuncio: id_anuncio,
         };
        
         console.log(iniciar_chat)

         socket.emit('iniciar_chat', iniciar_chat);
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
                                
                            </div>
                            <div className="col-6">
                                
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
                                    <div className="card background-black card-anuncio">
                                        <div className="card-header border-0 background-diferenciado">
                                            <div className="row">
                                                <div className="col-8 mr-5">
                                                    <img src={IconeUser} alt="Icone Usuario" title="Icone Usuario" className="rounded-circle icone-usuario"/> 
                                                    <span className="nome-usuario align-middle feed-titulo" >{anuncios.usuario.nome}</span>
                                                </div>
                                                {
                                                    function(){
                                                        // console.log(anuncios.is_jogo)
                                                        if(anuncios.genero){
                                                            return( 
                                                                <>
                                                                <div key={anuncios.genero.id_genero} className="col-2.5 align-self-center mr-1"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div>
                                                                {/* <div key={anuncios.genero.id_genero} className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div> */}
                                                                </>
                                                            );
                                                        }
                                                    }()
                                                }
                                                {
                                                    function(){
                                                        // console.log(anuncios.is_jogo)
                                                        if(anuncios.distancia){
                                                            return(
                                                                <>
                                                                <div className="col-2.5 pl-0 align-self-center"><span className="badge badge-pill genero-anuncio">{anuncios.distancia}</span></div>
                                                                {/* <div key={anuncios.genero.id_genero} className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div> */}
                                                                </>
                                                            );
                                                        }
                                                    }()
                                                }
                                                {/* <div className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div> */}
                                            </div>
                                            
                                        </div>
                                        <div className="card-body card-body-diferenciado"> 
                                            <div className="row">
                                                <div className="col-1"></div>
                                                <div className="col-10">
                                                    <div className="card bg-transparent card-anuncio-jogo sem-borda">
                                                        {
                                                            function(){
                                                                // console.log(anuncios.info_rawg)
                                                                if(anuncios.info_rawg){
                                                                    return(
                                                                        <div className="card-header fonte-padrao2 bg-transparent text-center sem-borda">{anuncios.info_rawg.jogo.nome}</div>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        <div className="card-header fonte-padrao2 bg-transparent text-center sem-borda">{anuncios.titulo}</div>
                                                                    ); 
                                                                }
                                                            }() 
                                                        }
                                                       
                                                        <div className="card-body card-body-anuncio ">
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
                                    
                                        <div className="card-footer background-diferenciado">
                                            {/* <button className="btn btn-leia-mais" onClick={this.abrirModal}>Leia Mais</button> */}
                                            <button className="btn btn-leia-mais" data-toggle="modal" data-target={".anuncio" + this.cont}>Leia Mais</button>
                                            {/* Modal  */}
                                            {/* CUUUUUUUUUUUUUUUUUUUUUU */}
                                            <div className={"modal fade anuncio" + this.cont} role="dialog" id="myModal1">
                                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                                    {/* Conteúdo do modal */}
                                                    <div className="modal-content background-222222">
                                            
                                                        {/* Cabeçalho do modal */}
                                                        <div className="modal-header background-diferenciado texto-laranja font-1 border-0">

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
                                                        <div className="modal-body background-222222 border-0 card-body-diferenciado">
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
                                                        <div className="modal-footer background-diferenciado border-0">
                                                            {/* <Link to="/chat"> */}
                                                                <button type="button" className="btn background-222222 texto-laranja mr-auto btn-iniciar-chat" data-toggle="modal" href="#myModal2" onClick={e => this.iniciarChat(anuncios.id_anuncio, anuncios.preco != null ? "venda" : "troca")} >
                                                                    <img src={IconChat} alt="" title=""/> Tenho interesse !
                                                                </button>
                                                            {/* </Link>                                                             */}
                                                            <button type="button" className="btn background-222222 texto-laranja ml-auto btn-fechar" data-dismiss="modal">Fechar</button>
                                                        </div>
                                            
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Fim Modal */}
                                            <div className="modal fade rotate" id="myModal2" style={{zIndex:9999}}>
                                                <div className="modal-dialog modal-dialog-centered modal-sm">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            
                                                            <h4 className="modal-title texto-laranja">Chat iniciado com sucesso!</h4>
                                                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>

                                                        </div>
                                                        <div class="modal-body">
                                                            Deseja ir para o chat ou continuar navegando?
                                                        </div>
                                                        <div class="modal-footer">

                                                            
                                                            <a className="btn mr-auto background-222222 texto-laranja mr-auto btn-iniciar-chat" data-dismiss="modal" onClick={() => this.fecharModal()}>Ir para o chat</a>
                                                            
                                                            <a href="#" data-dismiss="modal" className="btn background-222222 texto-laranja ml-auto btn-fechar">Fechar</a>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

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
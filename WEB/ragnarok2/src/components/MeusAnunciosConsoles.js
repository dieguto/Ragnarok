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
        this.cont = 0;
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
        
        fetch( `${api}/anuncios/usuario/${usuario.id}/0/1/0/1/100/preco/1/9999/asc`)
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
                                        <Link to="/meusAnuncios" className="col-4 tab1 text-center">
                                            <img className="icone-tab1" src={IconeJogo} alt="Icone Jogos" title="Icone Jogos"/>
                                        </Link>                        
                                        <Link to="/meusAnunciosAcessorios" className="col-4 tab2 text-center">
                                            <img className="icone-tab2" src={IconeAcessorio} alt="Icone Acessorio" title="Icone Acessorio"/>
                                        </Link>
                                        <Link to="/meusAnunciosConsoles" className="col-4 tab3 text-center">
                                            <img className="icone-tab2" src={IconeConsole} alt="Icone Console" title="Icone Console"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row pl-4 pb-2">
                                    {
                                        this.state.anuncios.map(
                                            anuncios => 
                                            

                                            <div className="col-5 ml-5 mr-5">
                                                <div className="background-222222 card-meu-anuncio borda-20px">
                                                    {
                                                        function(){
                                                            return(
                                                                <div className="card-header texto-branco text-center">{anuncios.titulo}</div>
                                                            ); 
                                                        }() 
                                                    }
                                                    {/* <div className="card-header texto-branco text-center">O bom de guerra</div> */}
                                                    <div className="card-body"> 
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="card card-meu-anuncio sem-borda bg-transparent mb-0">
                                                                    <div className="card-body">
                                                                        {
                                                                            function(){ 
                                                                                if(anuncios.info_rawg == null){                                                                        
                                                                                    return (
                                                                                        <img src={api + "/" + anuncios.c_fotos[0]} alt={"Foto " +  anuncios.titulo} title={"Foto " +  anuncios.titulo} className="card-img borda-20px card-img-meu-anuncio"></img>
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
                                                        <button className="btn btn-leia-mais" data-toggle="modal" data-target={".meu-anuncio" + this.cont}>Leia Mais</button>
                                                        {/* Modal */}
                                                        <div className={"modal fade meu-anuncio" + this.cont} role="dialog">
                                                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                                                {/* Conteúdo do modal*/}
                                                                <div className="modal-content background-222222">
                                                        
                                                                    {/* Cabeçalho do modal */}
                                                                    <div className="modal-header texto-laranja background-333333 border-0">
                                                                        {
                                                                            function(){
                                                                                return(
                                                                                    <>
                                                                                        <span className="modal-title text-center ml-auto">{anuncios.titulo}</span>
                                                                                    </>
                                                                                );
                                                                            }()
                                                                        }                                                                    
                                                                        <button type="button" className="close texto-laranja border-0 btn-icone-fechar" data-dismiss="modal">&times;</button>
                                                                    </div>
                                                        
                                                                    {/* Corpo do modal */}
                                                                    <div className="modal-body background-222222 border-0">
                                                                    <div className="row">
                                                                        <div className="col-11 mr-auto ml-auto">
                                                                                <div className="row">
                                                                                    {                                                                            
                                                                                        function(){
                                                                                            if(anuncios.info_rawg == null){
                                                                                                return (
                                                                                                    <div className="col-6">
                                                                                                        <img src={api + "/" + anuncios.c_fotos[0]} alt={"Foto " +  anuncios.titulo} title={"Foto " +  anuncios.titulo} className="img-fluid"></img>
                                                                                                    </div>
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
                                                                                <div className="row mt-4">
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
                                                                        <button type="button" className="btn background-222222 texto-laranja ml-auto btn-fechar" data-dismiss="modal">Fechar</button>
                                                                    </div>
                                                        
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Fim Modal */}
                                                        <span style={{display:"none"}}>{this.cont = this.cont + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        )
    }
}
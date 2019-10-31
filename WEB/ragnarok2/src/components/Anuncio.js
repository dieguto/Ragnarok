import React,{Component} from 'react';
import IconeUser from '../assets/user.svg'

import api from '../services/api';
import Carousel from 'nuka-carousel'
import '../css/cadastro-anuncio.css';

// console.log(api)

export default class Anuncio extends Component {

    constructor(){
        super();
        this.state = {anuncios: []}
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
                <h2 titulo-cadastro-anuncio>Feed</h2>
                {
                  

                    this.state.anuncios.map(
                        anuncios => 

                        
                            
                            <div className="row" key={anuncios.id_anuncio}>
                                <div className="col-1"></div>
                                <div className="col-10">
                                    <div className="card card-anuncio borda-20px">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-4"><img src={IconeUser} className="rounded-circle icone-usuario"/></div>
                                                <div className="col-6">{anuncios.usuario.nome}</div>
                                                {
                                                    function(){
                                                        // console.log(anuncios.is_jogo)
                                                        if(anuncios.genero){
                                                            return(
                                                                <div className="col-2"><span className="badge badge-pill genero-anuncio">{anuncios.genero.nome}</span></div>
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
                                                       
                                                        <div className="card-body">
                                                            {
                                                               function(){
                                                                // console.log(anuncios.info_rawg)
                                                                // console.log(api + anuncios.c_fotos)
                                                                if(anuncios.info_rawg){
                                                                    return(
                                                                        // <img src={anuncios.info_rawg.jogo.imagem_fundo} className="card-img borda-20px"/>
                                                                        
                                                                        <Carousel 
                                                                        renderTopCenterControls={({ currentSlide }) => (
                                                                            <div>{currentSlide}</div>
                                                                          )}
                                                                          renderCenterLeftControls={({ previousSlide }) => (
                                                                            <button className="d-none" onClick={previousSlide}></button>
                                                                          )}
                                                                          renderCenterRightControls={({ nextSlide }) => (
                                                                            <button className="d-none" onClick={nextSlide}></button>
                                                                          )}>
                                                                            <img src={anuncios.info_rawg.jogo.imagem_fundo}></img>
                                                                            <video controls poster={anuncios.info_rawg.jogo.preview_video}>
                                                                                <source src={anuncios.info_rawg.jogo.video} type="video/mp4"></source>
                                                                            </video>
                                                                            {/* <img src={api + "/" + anuncios.c_fotos} className="card-img borda-20px"/> */}
                                                                        </Carousel>
                                                                    );
                                                                }else{
                                                                    return(
                                                                        function(){
                                                                            console.log(anuncios.c_fotos)
                                                                            if(anuncios.c_fotos){
                                                                                // console.log(anuncios.c_fotos.map())
                                                                                anuncios.c_fotos.map(
                                                                                    
                                                                                    fotos => console.log(fotos) //<img src={api + "/" + fotos} className="card-img borda-20px"/>
                                                                                    
                                                                                )
                                                                                // <img src={api + "/" + anuncios.c_fotos} className="card-img borda-20px"/>
                                                                            }else{
                                                                                anuncios.c_fotos.map(
                                                                                    
                                                                                    fotos => console.log(fotos) //<img src={api + "/" + fotos} className="card-img borda-20px"/>
                                                                                    
                                                                                )
                                                                            }
                                                                        }
                                                                       
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
                                        <div className="card-footer"><button className="btn btn-leia-mais">Leia Mais</button></div>
                                    </div>
                                </div>
                                <div className="col-1"></div>
                        </div>
        
             
                    )
                }
            </div> 
         </>              
        )
    }
}
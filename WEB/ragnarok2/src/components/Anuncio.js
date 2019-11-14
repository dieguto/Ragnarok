import React,{Component} from 'react';
import IconeUser from '../assets/user.svg'

import api from '../services/api';
import Carousel from 'nuka-carousel'
import '../css/cadastro-anuncio.css';

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
                                    <div className="card card-anuncio borda-20px">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-9"><img src={IconeUser} className="rounded-circle icone-usuario"/> <span className="nome-usuario align-middle feed-titulo" >{anuncios.usuario.nome}</span></div>
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
                                                                                        return <img src={anuncios.info_rawg.jogo.imagem_fundo} className="card-img card-img-anuncio"></img>
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
                                                                                    return anuncios.c_fotos.map(
                                                                                             
                                                                                        fotos =>
                                                                                        <Carousel renderCenterLeftControls={({ previousSlide }) => (
                                                                                            <button className="d-none" onClick={previousSlide}></button>
                                                                                          )}
                                                                                          renderCenterRightControls={({ nextSlide }) => (
                                                                                            <button className="d-none" onClick={nextSlide}></button>
                                                                                          )}>
                                                                                            <img src={api + "/" + fotos} className="card-img borda-20px card-img-anuncio"/>
                                                                                        </Carousel>
                                                                                    )
                                                                                }()
                                                                            }
                                                                            {/* <img src={api + "/" + anuncios.c_fotos} className="card-img borda-20px"/> */}
                                                                        </Carousel>
                                                                    );
                                                                }
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
                                                                                            
                                                                                            fotos =>{
                                                                                                
                                                                                                return <img src={api + "/" + fotos} className="card-img borda-20px"/>
                                                                                                
                                                                                            }
                                                                                            
                                                                                            
                                                                                        )
                                                                                       
                                                                                }()
                                                                            }
                                                                        </Carousel>                                                                      
                                                                    );
                                                                    
                                                                
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
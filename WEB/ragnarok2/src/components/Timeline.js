import React, {Component} from 'react';


import Spin from '../assets/spin.svg';
import Slide0 from '../assets/021.jpg'
import Slide1 from '../assets/022.jpg'
import Slide2 from '../assets/023.jpg'
import Slide3 from '../assets/024.jpg'
import Slide4 from '../assets/025.jpg'
import Slide5 from '../assets/026.jpg'
import Slide6 from '../assets/027.jpg'
import Slide7 from '../assets/028.jpg'
import Slide8 from '../assets/029.jpg'
import Slide9 from '../assets/030.jpg'
import Slide10 from '../assets/031.jpg'
import Slide11 from '../assets/032.jpg'
import SlideMini0 from '../assets/021-s96x48.jpg'
import SlideMini1 from '../assets/022-s96x48.jpg'
import SlideMini2 from '../assets/023-s96x48.jpg'
import SlideMini3 from '../assets/024-s96x48.jpg'
import SlideMini4 from '../assets/025-s96x48.jpg'
import SlideMini5 from '../assets/026-s96x48.jpg'
import SlideMini6 from '../assets/027-s96x48.jpg'
import SlideMini7 from '../assets/028-s96x48.jpg'
import SlideMini8 from '../assets/029-s96x48.jpg'
import SlideMini9 from '../assets/030-s96x48.jpg'
import SlideMini10 from '../assets/031-s96x48.jpg'
import SlideMini11 from '../assets/032-s96x48.jpg'

class AnuncioJogo extends Component{

    constructor(){
        super();
        this.state = {anuncios: []}
    }

    componentDidMount(){
        fetch('http://localhost:3107/anuncios/todos/1/0/1/10/distancia/0/9999/asc')
        .then(response => response.json())
        .then(anuncios => {
            this.setState({anuncios:anuncios})
            console.log(anuncios)
        })
    }

    render(){
        return(
            <div id="container-anuncios">
            <div id="feed">

                <h2 id="feed-titulo">Feed</h2>
                
                    <div class="row">
                    <div class="col-1"></div>
                    <div class="col-10">
                        <div class="card card-anuncio borda-20px">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-4"><img src="img/power.jpg" class="rounded-circle icone-usuario"/></div>
                                    <div class="col-6">Nome de usuario</div>
                                    <div class="col-2"><span class="badge badge-pill genero-anuncio">Aventura</span></div>
                                </div>
                            </div>
                            <div class="card-body"> 
                                <div class="row">
                                    <div class="col-1"></div>
                                    <div class="col-10">
                                        <div class="card card-anuncio sem-borda">
                                            <div class="card-header text-center sem-borda">God of War</div>
                                            <div class="card-body">
                                                <img src="img/god-of-war.jpg" class="card-img borda-20px"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                                
                            </div>
                            <div class="card-footer"><button class="btn btn-leia-mais">Leia Mais</button></div>
                        </div>
                    </div>
                    <div class="col-1"></div>
                </div>
                
            </div>
            <div id="mais-populares">
                <h3 id="mais-populares-titulo">Mais Populares:</h3>
                <i class="badge badge-pill genero-anuncio">Aventura</i>
                <i class="badge badge-pill genero-anuncio">Aventura</i>
                <i class="badge badge-pill genero-anuncio">Aventura</i>
                <i class="badge badge-pill genero-anuncio">Aventura</i>
                <i class="badge badge-pill genero-anuncio">Aventura</i>
            </div>
        </div>
        )
    }

}

export default class Timeline extends Component {
    render(){
        return(
            <div id="container">

        

        <AnuncioJogo></AnuncioJogo>

    </div>
        )
    }
}
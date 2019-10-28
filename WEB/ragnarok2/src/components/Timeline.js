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
        fetch('http://localhost:3107/genero/todos')
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

        {/* <!-- INICIO SLIDER --> */}
        <div id="jssor_1">
            {/* <!-- Loading Screen --> */}
            <div data-u="loading" id="jssorl-009-spin">
                <img src={Spin} />
            </div>
            <div data-u="slides" id="slides">
                <div>
                    <img data-u="image" src={Slide1} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini1} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide2} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini2} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide3} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini3} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide4} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini4} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide5} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini5} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide6} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini6} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide0} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini0} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide7} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini7} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide8} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini8} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide9} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini9} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide10} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini10} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src={Slide11} />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src={SlideMini11} />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
            </div>
            {/* <!-- Thumbnail Navigator --> */}
            <div data-u="thumbnavigator" class="jssort121" data-autocenter="2" data-scale-left="0.75">
                <div data-u="slides">
                    <div data-u="prototype" class="p">
                        <div data-u="thumbnailtemplate" class="t"></div>
                    </div>
                </div>
            </div>
            {/* <!-- Bullet Navigator --> */}
            <div data-u="navigator" class="jssorb111" data-scale="0.5">
                <div data-u="prototype" class="i prototype">
                    <svg viewbox="0 0 16000 16000"  class="svg">
                        <circle class="b" cx="8000" cy="8000" r="3000"></circle>
                    </svg>
                    <div data-u="numbertemplate" class="n"></div>
                </div>
            </div>
        </div>
        {/* <!-- Final do Slide --> */}

        <AnuncioJogo></AnuncioJogo>

    </div>
        )
    }
}
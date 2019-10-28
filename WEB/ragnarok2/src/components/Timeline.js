import React, {Component} from 'react';

export default class Timeline extends Component {
    render(){
        return(
            <div id="container">

        {/* <!-- INICIO SLIDER --> */}
        <div id="jssor_1">
            {/* <!-- Loading Screen --> */}
            <div data-u="loading" id="jssorl-009-spin">
                <img src="img/spin.svg" />
            </div>
            <div data-u="slides" id="slides">
                <div>
                    <img data-u="image" src="../assets/022.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/022-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/023.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/023-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/024.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/024-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/025.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/025-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/026.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/026-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/027.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/027-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/021.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/021-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/028.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/028-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/029.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/029-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/030.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/030-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/031.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/031-s96x48.jpg" />
                        <span class="ti">Title</span><br />
                        <span class="d">Slide Description</span>
                    </div>
                </div>
                <div>
                    <img data-u="image" src="img/032.jpg" />
                    <div data-u="thumb">
                        <img data-u="thumb" class="i" src="img/032-s96x48.jpg" />
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

    </div>
        )
    }
}
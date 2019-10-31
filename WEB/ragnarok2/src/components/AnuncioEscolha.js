import React, {Component} from 'react';
import '../css/escolha-anuncio.css'
import ImgJogo from '../assets/jogo.png';
import ImgAcessorio from '../assets/acessorio.png';
import ImgConsole from '../assets/console.png';
import ImgTroca from '../assets/troca.png';
import {Link} from 'react-router';


export default class AnuncioEscolha extends Component {
    render(){
        return(
            <div id="container">
            <h1 className="titulo-cadastro-anuncio">O que deseja anunciar?</h1>
            <div className="row">
                <div className="col-5 mr-auto ml-auto">
                    <hr className="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo"/>
            </div>
            </div>
            <div id="container_escolha">
                <div className="row">
                    <div className="col-sm-5 ml-auto mr-auto card card-escolha background-333333">
                        <div className="card-body body-card-escolha">
                            <Link to="/anuncio/cadastroJogo">
                                <img src={ImgJogo} className="img-thumbnail background-333333 imagem-escolha"/>
                            </Link>
                            
                        </div>
                        <div className="card-footer text-center background-333333 texto-laranja footer-card-escolha">Jogo</div>
                    </div>
                    <div className="col-sm-5 ml-auto mr-auto card card-escolha background-333333">
                        <div className="card-body body-card-escolha">
                            <img src={ImgAcessorio} className="img-thumbnail background-333333 imagem-escolha"/>
                        </div>
                        <div className="card-footer text-center background-333333 texto-laranja footer-card-escolha">Acessorio</div>
                    </div>
                    <div className="col-sm-5 ml-auto mr-auto card card-escolha background-333333">
                        <div className="card-body body-card-escolha">
                            <img src={ImgConsole} className="img-thumbnail background-333333 imagem-escolha"/>
                        </div>
                        <div className="card-footer text-center background-333333 texto-laranja footer-card-escolha">Console</div>
                    </div>
                    <div className="col-sm-5 ml-auto mr-auto card card-escolha background-333333">
                        <div className="card-body body-card-escolha">
                            <img src={ImgTroca} className="img-thumbnail background-333333 imagem-escolha"/>
                        </div>
                        <div className="card-footer text-center background-333333 texto-laranja footer-card-escolha">Troca</div>
                    </div>
                </div>
            </div>
        </div>
        ) 
    }
}
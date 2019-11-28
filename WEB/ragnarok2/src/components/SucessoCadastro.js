import React, {Component} from 'react';
import {Link} from 'react-router';

import '../css/sucesso.css';

export default class Sucesso extends Component {
    render(){
        return(
            <div id="container mt-5 mb-5">

                <div className="row mt-5 mb-5">
                    <div className="col-3 mr-auto ml-auto background-333333 caixa-sucesso">
                        <div className="card bg-transparent border-0">
                            <div className="card-header bg-transparent texto-branco text-center">Cadastro Realizado com Sucesso !</div>
                            <div className="card-body bg-transparent texto-branco text-center">Deseja cadastrar outro produto, ou ir para Home?</div>
                            <div className="card-footer bg-transparent texto-branco">
                                <div className="row">
                                    <div className="col-6"></div>
                                    <div className="col-8.5">
                                        <Link to="/">
                                            <button type="button" className="btn btn-secondary">Voltar</button>
                                        </Link>
                                        <Link to="/anuncio">
                                            <button type="button" className="btn btn-warning ml-2">Continuar Cadastrando!</button>
                                        </Link>
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

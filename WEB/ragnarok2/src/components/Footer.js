import React, {Component} from 'react';
import ImgLogo from '../assets/logo-ragnarok.png';


import '../css/main.css';

export default class Footer extends Component{
    render(){
        return(
            // <!-- Footer -->
            <footer className="page-footer font-small unique-color-dark" >
                
                {/* <!-- Footer Links --> */}
                <div className="container text-center text-md-left mt-5">
            
                {/* <!-- Grid row --> */}
                <div className="row mt-3">
            
                    {/* <!-- Grid column --> */}
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            
                    {/* <!-- Content --> */}
                    <h6 className="text-uppercase font-weight-bold">Pro.Code()</h6>
                    <hr className="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-footer"/>
                    <p>
                            Somos uma empresa que sonha grande: somos quatro pessoas apaixonadas pelo que fazemos. Nosso objetivo é impulsionar o setor de jogos com 
                            novas ideias e sempre muita qualidade no nosso serviço.
                    </p>
                    <p>
                            Prazer, somos a Pro.Code().
                    </p>
                    </div>
                    {/* <!-- Grid column --> */}
            
                    {/* <!-- Grid column --> */}
                    <div className="col-md-5 col-lg-2 col-xl-2 mx-auto mb-4">
                    <div id="logo-footer">
                        <img src={ImgLogo} class="img-fluid"/>
                    </div>
                    </div>
                    {/* <!-- Grid column --> */}
            
                    {/* <!-- Grid column --> */}
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            
                    {/* <!-- Links --> */}
                    <h6 className="text-uppercase font-weight-bold">Contatos</h6>
                    <hr className="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-footer"/>
                        <p>
                            Endereço: Rua João de Paiva, 545, Tarauacá, Acre
                        </p>
                        <p>
                            Email: contato@ragnarok.com
                        </p>
                        <p>
                            Telefone: (68)4002-8922
                        </p>
                      
                        <p>
                            Celular: (68)99263-3740
                        </p>
            
                    </div>
                    {/* <!-- Grid column --> */}
            
                </div>
                {/* <!-- Grid row --> */}
            
                </div>
                {/* <!-- Footer Links --> */}
            
                {/* <!-- Copyright --> */}
                <div className="footer-copyright text-center py-3">© 2019 Copyright - SOMOS UMA EMPRESA DE DONOS - 
                <a target="_blank" href="https://php.net"> Ragnarok.com.br</a>
                </div>
                {/* <!-- Copyright --> */}
            
            </footer>
        

        )

    }
}
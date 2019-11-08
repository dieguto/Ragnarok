import React, { Component } from 'react';
import '../css/cms.css';

// import { Container } from './styles';

export default class CMS extends Component {
  render() {
    return (
        <div id="container">

        <div class="row caixa-menu">
            <div class="col-3 background-333333">
                
                <div class="row background-454545 p-3">
                    <div class="col-12 texto-laranja">
                        <h2 class="">Ragnarok</h2>
                    </div>
                </div>
                
                <div class="row p-2">
                    <div class="col-12 texto-branco">
                        <h4 class="">Anúncios</h4>
                    </div>
                </div>

                <div class="row background-454545 p-2">
                    <div class="col-12 texto-branco">
                        <h4 class="">Usuários</h4>
                    </div>
                </div>
                    
                <div class="row p-2">
                    <div class="col-12 texto-branco">
                        <h4 class="">Feed</h4>
                    </div>
                </div>
                    
            </div>
        </div>
        

    </div>
    );
  }
}

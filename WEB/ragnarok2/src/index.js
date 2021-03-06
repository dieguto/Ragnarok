import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './App';

import Login from './components/Login';
import Logout from './components/Logout';
import CadastroUsuario from './components/CadastroUsuario';
import EditarUsuario from './components/EditarUsuario';
import MeusAnuncios from './components/MeusAnuncios';
import MeusAnunciosAcessorios from './components/MeusAnunciosAcessorios';
import MeusAnunciosConsoles from './components/MeusAnunciosConsoles';

import Anuncio from './components/AnuncioEscolha';
import CadastroJogos from './components/CadastroJogo';
import CadastroAcessorio from './components/CadastroAcessorios';
import CadastroConsole from './components/CadastroConsole';
import Troca from './components/Troca';

import Sucesso from './components/SucessoCadastro';

import Chat from './components/Chat';
import CMS from './components/CMS'


import Timeline from './components/Timeline';

import './css/reset.css';
import { matchesPattern } from '@babel/types';

function verificaAutenticacao(nextState, replace){
    const resultado = matchesPattern('/anuncio(/:cadastroJogo)', nextState.location.pathname);
    console.log(resultado)

}

ReactDOM.render(
    (
        /* historíco de navegação para podermos realizar a navegação entre as rotas */
        <Router history={browserHistory}>
                  <Route path="/" component={App}>
                      <IndexRoute component={Timeline}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/logout" component={Logout}/>
                      <Route path="/anuncio" component={Anuncio}/>
                      <Route path="/anuncio/cadastroJogo" onEnter={verificaAutenticacao} component={CadastroJogos}/>
                      <Route path="/anuncio/cadastroAcessorio" component={CadastroAcessorio}/>
                      <Route path="/anuncio/cadastroConsole" component={CadastroConsole}/>
                      <Route path="/anuncio/troca" component={Troca} />
                      <Route path="/cadastroUsuario" component={CadastroUsuario}/>
                      <Route path="/editarUsuario" component={EditarUsuario}/>
                      <Route path="/meusAnuncios" component={MeusAnuncios}/>
                      <Route path="/meusAnunciosAcessorios" component={MeusAnunciosAcessorios}/>
                      <Route path="/meusAnunciosConsoles" component={MeusAnunciosConsoles}/>
                      <Route path="/sucesso" component={Sucesso} />

                      <Route path="/chat" component={Chat}/>
                      <Route path="/admin/cms" component={CMS} />
                  </Route>
        </Router>
    ), 
document.getElementById('root')
);

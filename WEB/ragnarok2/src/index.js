import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Login from './components/Login';
import CadastroJogos from './components/CadastroJogo';
import CadastroUsuario from './components/CadastroUsuario';
import App from './App';
import Timeline from './components/Timeline';
import Anuncio from './components/AnuncioEscolha';
import './css/reset.css';

// import './Utils/slider';

ReactDOM.render(
    (
        /* historíco de navegação para podermos realizar a navegação entra as rotas */
        <Router history={browserHistory}>
                  <Route path="/" component={App}>
                      <IndexRoute component={Timeline}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/anuncio" component={Anuncio}>
                        <Route path="/anuncio/cadastroJogo" component={CadastroJogos}/>
                        <Route path="/cadastroUsuario" component={CadastroUsuario}/>
                      </Route>
                      
                  </Route>
        </Router>
    ), 
document.getElementById('root')
);

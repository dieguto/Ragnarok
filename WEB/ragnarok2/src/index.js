import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Login from './components/Login';
import CadastroJogos from './components/CadastroJogo'
import App from './App';
import './css/reset.css';

// import './Utils/slider';

ReactDOM.render(
    (
        /* historíco de navegação para podermos realizar a navegação entra as rotas */
        <Router history={browserHistory}>
            <Route path="/login" component={Login}/>
            <Route path="/cadastroAnuncioJogo" component={CadastroJogos}/>
            <Route path="/" component={App}/>
        </Router>
    ), 
document.getElementById('root')
);

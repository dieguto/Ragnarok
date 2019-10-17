import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, browserHistory} from 'react-router';


import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';


import {UsuarioBox} from './pages/Cadastro';
import {AnuncioBox} from './pages/Anuncios';
import Login from './pages/Login';
import Main from './components/Main';
import store from './store';



ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ App } >
                <Route exact path="/" component={ Main }/>
                <Route path="/cadastro" component={UsuarioBox}/>
                <Route path="/login" component={Login}/>
                <Route path="/usuario/:id" component={Main} />
                <Route path="/anuncios" component={AnuncioBox} />
            </Route>
        </Router>
    </Provider>
, 
document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import allReducer from './reducers';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {UsuarioBox} from './pages/Cadastro';
import {AnuncioBox} from './pages/Anuncios';
import {LoginBox} from './pages/Login';
import Main from './components/Main';
import { promiseMiddleware } from './middleware'
import store from './store';



ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={ App } >
                <IndexRoute component={ Main }></IndexRoute>

                <Route path="/cadastro" component={UsuarioBox}/>
                <Route path="/login" component={LoginBox}/>
                <Route path="/usuario/:id" component={Main} />
                <Route path="/anuncios" component={AnuncioBox} />
            </Route>
        </Router>
    </Provider>
, 
document.getElementById('root'));


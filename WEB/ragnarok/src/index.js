import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import App from './App';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {UsuarioBox} from './pages/Cadastro';
import {LoginBox} from './pages/Login';
import Main from './pages/Main';

ReactDOM.render(
<Router history={ browserHistory}>
    <Route path="/" component={ App } >
        {/* <IndexRoute component={ FormularioCadastro }></IndexRoute> */}
        <Route path="/cadastro" component={UsuarioBox}/>
        <Route path="/login" component={LoginBox}/>
        <Route path="/usuario/:id" component={Main} />
    </Route>
</Router>, 
document.getElementById('root'));


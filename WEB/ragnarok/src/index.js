import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import allReducer from './reducers';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {UsuarioBox} from './pages/Cadastro';
import {LoginBox} from './pages/Login';
import Main from './pages/Main';

const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
    <Provider store={store}>
        <Router history={ browserHistory}>
            <Route path="/" component={ App } >
                {/* <IndexRoute component={ FormularioCadastro }></IndexRoute> */}
                <Route path="/cadastro" component={UsuarioBox}/>
                <Route path="/login" component={LoginBox}/>
                <Route path="/usuario/:id" component={Main} />
            </Route>
        </Router>
    </Provider>
, 
document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import App from './App';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';


ReactDOM.render(
<Router history={ browserHistory}>
    <Route path="/" component={ App } ></Route>
</Router>, 
document.getElementById('root'));


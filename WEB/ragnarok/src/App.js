import React,{Component} from 'react';
import Menu from './components/Menu';
import {useSelector, useDispatch} from 'react-redux';



import Routes from './routes'

import './css/pure-min.css';
import './css/bootstrap.min.css';

import './App.css';


class App extends Component{
    render(){
        return (
            <div id="layout">
                <Menu></Menu>
                <div className="main">
                     {this.props.children}
                </div>
            </div>
            
        ); 
    }
}

export default App;

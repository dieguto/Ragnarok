import React,{Component} from 'react';
import Menu from './components/Menu'


import Routes from './routes'

import './css/pure-min.css';
import './css/bootstrap.min.css';
import './App.css';

class App extends Component{
    render(){
        return (
            <div>
                <Menu></Menu>
             </div>
        ); 
    }
}

export default App;

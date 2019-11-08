import {Component} from 'react'
import {browserHistory} from 'react-router'

export default class Logout extends Component{
    
    componentWillMount(){
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        browserHistory.push('/');
    }
    
    render(){
        return null
    }
}
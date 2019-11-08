import {Component} from 'react'
import {browserHistory} from 'react-router'

export default class Logout extends Component{
    
    componentWillMount(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        browserHistory.push('/');
    }
    
    render(){
        return null
    }
}
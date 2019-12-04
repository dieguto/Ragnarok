import {Component} from 'react'
import {browserHistory} from 'react-router'
import { ERRO, Notificacao, INFO, AVISO, PADRAO, CAMPO_VAZIO, SUCESSO, SUCESSO_CADASTRO } from '../Alerta';

export default class Logout extends Component{
    
    componentWillMount(){
        Notificacao(SUCESSO, 'Volte Logo')
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('usuario');
        browserHistory.push('/');
    }
    
    render(){
        return null
    }
}
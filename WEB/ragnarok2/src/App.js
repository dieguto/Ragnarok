import React,{Component} from 'react';
// import './css/marketing.css';
import './css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/js/dist/util';
import './css/main.css';
import Menu from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';  

import { ERRO, Notificacao, INFO, AVISO, PADRAO, CAMPO_VAZIO, SUCESSO } from './Alerta';

import {socket} from './components/Anuncio';

class App extends Component {
  componentDidMount(){
    socket.on('notificacao', notificacao => {
      Notificacao(PADRAO, notificacao.info)
      console.log(notificacao)
    })

  }

  render(){
  return (
    <div className="App">
      <ToastContainer></ToastContainer>
        <Menu/>
          {this.props.children}
        <Footer></Footer>
    </div>
  );}
}

export default App;

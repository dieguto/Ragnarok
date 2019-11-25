import React,{Component} from 'react';
// import './css/marketing.css';
import './css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap/js/dist/util';
import './css/main.css';
import Menu from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';  

class App extends Component {
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

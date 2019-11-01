import React,{Component} from 'react';
import './css/marketing.css'
import './css/bootstrap.min.css'
import './css/main.css';
import Menu from './components/Header';
import Timeline from './components/Timeline';
import Footer from './components/Footer';





class App extends Component {
  render(){
  return (
    <div className="App">
        <Menu/>
       {this.props.children}
        <Footer></Footer>
    </div>
  );}
}

export default App;

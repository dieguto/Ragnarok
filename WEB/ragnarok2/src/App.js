import React,{Component} from 'react';
import './css/marketing.css'
import './css/bootstrap.min.css'
import './css/main.css';
import Menu from './components/Header';
import Timeline from './components/Timeline';






class App extends Component {
  render(){
  return (
    <div className="App">
        <Menu/>
       {this.props.children}
    </div>
  );}
}

export default App;

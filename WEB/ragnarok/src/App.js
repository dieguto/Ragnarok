import React,{Component} from 'react';
import Menu from './components/Menu';
import './App.css';
import './css/pure-min.css';
import './css/bootstrap.min.css';


import Routes from './routes';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    appName: state.appName
})





class App extends Component{
    render(){
        return (
            <div id="layout">
                <Menu appName={this.props.appName}></Menu>
                {/* {this.props.appName} */}
                <div className="main">
                     {this.props.children}
                </div>
            </div>
            
        ); 
    }
}

// App.contextTypes = {
//     router: React.PropTypes.object.isRequired
// };

export default connect(mapStateToProps, () => ({}) )(App);

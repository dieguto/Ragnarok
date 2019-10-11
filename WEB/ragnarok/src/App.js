import React,{Component} from 'react';
import Menu from './components/Menu';
import './App.css';
import './css/pure-min.css';
import './css/bootstrap.min.css';
import agent from './agent';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
})

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: 'APP_LOAD', payload, token}),
    onRedirect: () =>
        dispatch({ type: 'REDIRECT'})
});

class App extends Component{
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
          agent.setToken(token);
        }
    
        this.props.onLoad(token ? agent.Auth.current() : null, token);
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
          this.context.router.replace(nextProps.redirectTo);
          this.props.onRedirect();
        }
      }

    render(){
        return (
            <div id="layout">
                <Menu 
                currentUser={this.props.currentUser}
                appName={this.props.appName}></Menu>
                {/* {this.props.appName} */}
                <div className="main">
                     {this.props.children}
                </div>
            </div>
            
        ); 
    }
}

App.contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(App);
  
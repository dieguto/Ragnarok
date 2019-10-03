import React from 'react'
import Banner from './Banner';
import MainView from './MainView.js';
import { connect } from 'react-redux';
import agent from '../agent'

const Promise = global.Promise;

const mapStateToProps = state => ({
    appName: state.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
  dispatch({ type: 'HOME_PAGE_LOADED', payload }),
});



class Main extends React.Component {

  componentDidMount(){
      this.props.onLoad(agent.Anuncios.all());
  }

    render() {
      return (
        <div className="home-page">
  
          <Banner appName={this.props.appName} />
  
          <div className="container page">
            <div className="row">
              <MainView />
  
              <div className="col-md-3">
                <div className="sidebar">
  
                  <p>Popular Tags</p>
  
                </div>
              </div>
            </div>
          </div>
  
        </div>
      );
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
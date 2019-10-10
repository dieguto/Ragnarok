import React from 'react'
import Banner from './Banner';
import MainView from './MainView.js';
import { connect } from 'react-redux';
import agent from '../agent'
import { images } from '../assets/images';
import { Gallery, GalleryImage} from 'react-gesture-gallery';

const Promise = global.Promise;

const mapStateToProps = state => ({
    appName: state.appName
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload) =>
  dispatch({ type: 'HOME_PAGE_LOADED', payload }),
});

// const [index, setIndex] = React.useState(0)
const INITIAL_INDEX = 0
function Slide() {
  const [index, setIndex] = React.useState(INITIAL_INDEX)

  React.useEffect(() => {
    const interval = setInterval( () => {
      if(index === images.length - 1){
        setIndex(INITIAL_INDEX)
      }else{
        setIndex(index + 1)
      }
     
    }, 2500)
    return () => clearInterval(interval)
  }, [index])


  return (
    <Gallery
    style= {{
      heigth: '100vh',
      width: '100vw'
    }}
    index={index}
    onRequestChange={i => {
      setIndex(i)
    }}
    >
    {images.map(image => (
      <GalleryImage objectFit="contain" src={image} />
    ))}
  </Gallery>
  )
}

class Main extends React.Component {
 

  componentDidMount(){
      this.props.onLoad(agent.Anuncios.all());
  }

    render() {
     
      return (
        <div className="home-page">

        <Slide></Slide>
  
          {/* <Banner appName={this.props.appName} /> */}
  
          <div className="container page">
            <div className="row">
              {/* <MainView /> */}
  
              <div className="col-md-3">
                <div className="sidebar">
  
                  {/* <p>Popular Tags</p> */}
  
                </div>
              </div>
            </div>
          </div>
  
        </div>
      );
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);
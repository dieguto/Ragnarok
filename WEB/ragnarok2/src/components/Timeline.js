import React, {Component} from 'react';

import Anuncio from './Anuncio';
// import { Carousel } from 'react-bootstrap';

// import Slider from '../components/Slider2';
import Slider from '../components/Slider';

class GeneroJogo extends Component{

    constructor(){
        super();
        this.state = {generos: []}
    }

    componentDidMount(){
       
        fetch('http://3.92.51.72:3107/genero/populares')
        .then(response => response.json())
        .then(generos => {
            this.setState({generos:generos})
            console.log(generos)
        })
    }

    render(){
        return(
           
            

            <div className="shadow-lg mais-populares">
                <h3 id="mais-populares-titulo" className="feed-titulo">Mais Populares:</h3>
                {
                    this.state.generos.map( genero => <i key={genero.id_genero} className="badge badge-pill genero-anuncio">{genero.nome}</i>)
                }
                
            </div>
        )
    }

}

export default class Timeline extends Component {
    render(){
        return(
            <div id="container">
                 <div id="container-anuncios">
                     {/* <Slider></Slider> */}
                     <Anuncio></Anuncio>

                
             
                    <GeneroJogo></GeneroJogo>
                 </div>
                
                
            </div>
        )
    }
}
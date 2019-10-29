import React, {Component} from 'react';

import Anuncio from './Anuncio';

class GeneroJogo extends Component{

    constructor(){
        super();
        this.state = {generos: []}
    }

    componentDidMount(){
       
        fetch('http://localhost:3107/genero/populares')
        .then(response => response.json())
        .then(generos => {
            this.setState({generos:generos})
            console.log(generos)
        })
    }

    render(){
        return(
           
            

            <div id="mais-populares">
                <h3 id="mais-populares-titulo">Mais Populares:</h3>
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
                     <Anuncio></Anuncio>

                
             
                    <GeneroJogo></GeneroJogo>
                 </div>
                
                
            </div>
        )
    }
}
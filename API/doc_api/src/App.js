import React, { Component } from 'react';
import BoxInfoImportante from './boxes/BoxInfoImportante';
import BoxUsuario from './boxes/BoxUsuario';
import BoxAuth from './boxes/BoxAuth';
import BoxAnuncio from './boxes/BoxAnuncio';
import BoxAnuncios from './boxes/BoxAnuncios';
import BoxGenero from './boxes/BoxGenero';
import BoxConsole from './boxes/BoxConsole';

class App extends Component {
   render() {
      return (
         <div className="container">
            <h1 className="text-center" style={{margin:35+"px"}}>Documentação Da Api Ragnarok</h1>
 
            <div id="outterAccordion">
               
               <BoxInfoImportante/>
               <BoxUsuario/>
               <BoxAuth/>
               <BoxAnuncio/>
               <BoxAnuncios/>
               <BoxGenero/>
               <BoxConsole/>

            </div>
         </div>
      );
   }
}

export default App;

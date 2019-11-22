import React, { Component } from 'react';
import BoxInfoImportante from './boxes/BoxInfoImportante';
import BoxUsuario from './boxes/BoxUsuario';
import BoxAuth from './boxes/BoxAuth';
import BoxAnuncio from './boxes/BoxAnuncio';
import BoxAnuncios from './boxes/BoxAnuncios';
import BoxGenero from './boxes/BoxGenero';
import BoxConsole from './boxes/BoxConsole';
import BoxSugestoes from './boxes/BoxSugestoes';
import BoxChat from './boxes/BoxChat';

class App extends Component {
   render() {
      return (
         <div className="container">
            <h1 className="text-center" style={{margin:20+"px"}}>Documentação Da Api Ragnarok</h1>

            <h3 className="text-center" style={{margin:20+"px"}}>
               <a rel="noopener noreferrer" target="_blank" href="https://rentry.co/36fm9">
                  Documentação Do Chat 
               </a>
            </h3>
 
            <div id="outterAccordion">
               
               <BoxInfoImportante/>
               <BoxUsuario/>
               <BoxAuth/>
               <BoxAnuncio/>
               <BoxAnuncios/>
               <BoxGenero/>
               <BoxConsole/>
               <BoxSugestoes/>
               <BoxChat/>

            </div>
         </div>
      );
   }
}

export default App;

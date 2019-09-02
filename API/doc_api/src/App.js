import React, { Component } from 'react';
import BoxInfoImportante from './boxes/BoxInfoImportante';
import BoxUsuario from './boxes/BoxUsuario';
import BoxLogin from './boxes/BoxLogin';

class App extends Component {
   render() {
      return (
         <div className="container">
            <h1 className="text-center" style={{margin:35+"px"}}>Documentação Da Api Ragnarok</h1>
 
            <div id="outterAccordion">
               
               <BoxInfoImportante/>
               <BoxUsuario/>
               <BoxLogin/>

            </div>
         </div>
      );
   }
}

export default App;

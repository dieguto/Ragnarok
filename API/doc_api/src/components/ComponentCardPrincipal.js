import React, { Component, Fragment } from 'react';

class ComponentCardPrincipal extends Component {

   render() {
      return (
         <Fragment>
            {/* <!--INICIO CARD PRINCIPAL--> */}
            <div className="card" style={{ marginBottom:20+"px" }}>
               {/* <!--TITULO CARD PRINCIPAL--> */}
               <div className="card-header text-center" style={{ backgroundColor: '#33cc33', color: 'black' }}
                  data-toggle="collapse" data-target={ "#" + this.props.titulo.replace(/ /g, "_")} aria-controls={this.props.titulo.replace(/ /g, "_")}>
                  <h2 className="font-weight-bold">{this.props.titulo}</h2>
               </div>

               <div id={this.props.titulo.replace(/ /g, "_")} className="collapse" data-parent="#outterAccordion">
                  {/* <!--CORPO CARD PRINCIPAL--> */}
                  <div className="card-body">
                     <div id={"accordion" + this.props.titulo.replace(/ /g, "_")}>

                        { this.props.children }
                        
                     </div>
                  </div>
               </div>
            </div>
            {/* <!--FIM CARD PRINCIPAL--> */}
         </Fragment>
      );
   }

}

export default ComponentCardPrincipal;
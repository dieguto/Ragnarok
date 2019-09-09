import React, { Component } from 'react';
import {Link} from 'react-router';



class Menu extends Component{

  render(){
      return(
          <div className="header">
            <div className="navbar navbar-light bg-dark">
              <h1 className="navbar-brand text-warning">Ragnarok</h1>

                    {/* <Link>teste</Link> */}
                    <Link to="/login" className="btn btn-outline-warning">Entrar</Link>
                    <Link to="/cadastro" className="btn btn-outline-warning">Cadastro</Link>
                    
                    {/* <button className="btn btn-outline-warning" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Cadastrar
                    </button> */}
            </div>
          </div>
   );
  }

}

export default Menu;



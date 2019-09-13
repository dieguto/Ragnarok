import React, { Component } from 'react';
import {Link} from 'react-router';
import { GiBrutalHelm } from 'react-icons/gi';

class Menu extends Component{

  render(){
      return(
          <div className="header">
            <div className="navbar navbar-light bg-dark">
              <h1 className="navbar-brand text-warning">Ragnarok</h1>
                <div className="form-inline">
                    <Link to="/login" className="btn btn-outline-warning ">Entrar</Link>
                    <Link to="/cadastro" className="btn btn-outline-warning ml-3">Cadastro</Link>
                </div>
                
            </div>
            
            
          </div>
   );
  }

}

export default Menu;



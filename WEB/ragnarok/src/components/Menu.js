import React, { Component } from 'react';
import {Link} from 'react-router';
import { GiBrutalHelm } from 'react-icons/gi';

class Menu extends Component{

  

  render(){
    let menu;
      return(

        
        
          <div className="header">
            <div className="navbar navbar-light bg-dark">
              <h1 className="navbar-brand text-warning">Ragnarok</h1>
                <div className="form-inline">
                    <Link to="/login" className="btn btn-outline-warning ">Entrar</Link>
                    <Link to="/cadastro" className="btn btn-outline-warning ml-3">Cadastro</Link>
                </div>
                
            </div>
            {/* Segundo menu */}
            <div className="navbar navbar-light bg-dark">
              <h1 className="navbar-brand text-warning">Ragnarok</h1>
                
                
                <div className="btn-group">
                <div>
                    <span>Bem vindo, Diego</span>
                    
                    <button type="button" className="btn btn-secondary dropdown-toggle ml-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                        <GiBrutalHelm/>
                        {/* <p></p> */}
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                        {/* <button className="dropdown-item" type="button">Bem vindo, Diego</button> */}
                        <button className="dropdown-item" type="button">Meus Anúncios</button>
                        <button className="dropdown-item" type="button">Meus Jogos</button>
                        <button className="dropdown-item" type="button">Configurações</button>
                        <button className="dropdown-item" type="button">Sair</button>
                    </div>
                </div>
                    
            </div>
            </div>
            
          </div>

          
   );
  }

}

export default Menu;



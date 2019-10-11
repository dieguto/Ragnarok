import React, { Component } from 'react';
import {Link} from 'react-router';
import { GiBrutalHelm } from 'react-icons/gi';

const LoggedOutView = props => {
  if(!props.currentUser) {
    return (
      <div className="header">
      <div className="navbar navbar-light bg-dark">
       

        <Link to="/" className="navbar-brand">
          <h1 className="navbar-brand text-warning">
            Ragnarok
          </h1>
        </Link>
          <div className="form-inline">
              <Link to="/login" className="btn btn-outline-warning ">Entrar</Link>
              <Link to="/cadastro" className="btn btn-outline-warning ml-3">Cadastro</Link>
          </div>
          
      </div>
      </div>
    )
  }
  return null;
}

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <div className="header">
    
             {/* Segundo menu */}
             <div className="navbar navbar-light bg-dark">
               <h1 className="navbar-brand text-warning">
                 {this.props.appName.toLowerCase()}
               </h1>
              
              
                 <div className="btn-group">
                 <div className="form-inline mr-3">
                   <Link to="/anuncios" className="btn btn-outline-warning ">Novo Anúncio</Link>
                 </div>
                 <div>
                 <Link
                    to={`@${props.currentUser.username}`}
                    className="nav-link">
                    {props.currentUser.username}
                  </Link>
                     {/* <span>Bem vindo, Diego</span> */}
                  
                     <button type="button" className="btn btn-secondary dropdown-toggle ml-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                         <GiBrutalHelm/>
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

    )
  }
  return null;
};

class Menu extends Component {

  render(){
  return(
       <nav>
         <div className="container">

            <LoggedOutView currentUser={this.props.currentUser}></LoggedOutView>
            <LoggedInView currentUser={this.props.currentUser}></LoggedInView>
         </div>
       </nav>
  )
  }
      

      
}
export default Menu;



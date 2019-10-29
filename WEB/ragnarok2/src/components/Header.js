import React, { Component } from 'react';
import {Link} from 'react-router';
import { GiBrutalHelm } from 'react-icons/gi';

export default class Menu extends Component{
    render(){
        if(localStorage.getItem('token') === null){
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
                        <Link to="/cadastroUsuario" className="btn btn-outline-warning ml-3">Cadastro</Link>
                    </div>
                    
                </div>
                </div>
              )
        }else{
            return (
                <div className="header">
              
                       {/* Segundo menu */}
                       <div className="navbar navbar-light bg-dark">
                         <Link to="/">
                            <h1 className="navbar-brand text-warning">                      
                                  Ragnarok
                            </h1>
                         </Link>
                        
                        
                           <div className="btn-group">
                           <div className="form-inline mr-3">
                             <Link to="/anuncio/cadastroJogo" className="btn btn-outline-warning ">Novo Anúncio</Link>
                           </div>
                           <div>
                           <Link
                              
                              className="nav-link">
                              Usuário
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
    }
}


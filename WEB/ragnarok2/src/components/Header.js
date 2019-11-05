import React, { Component } from 'react';
import {Link} from 'react-router';
import { GiBrutalHelm } from 'react-icons/gi';
import 'bootstrap/js/dist/util'



export default class Menu extends Component{



    render(){

      const zindex = {"z-index":"9999","width":"100%"}
     

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
                        <Link to="/cadastroUsuario" className="btn btn-outline-warning ml-3">Cadastrar-se</Link>
                    </div>
                    
                </div>
                </div>
              )
        }else{
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      console.log(usuario);
            return (
                <>
                <div style={zindex} className="header shadow-lg position-fixed">
              
                       {/* Segundo menu */}
                       <div className="navbar navbar-light bg-dark">
                         <Link to="/">
                            <h1 className="navbar-brand text-warning">                      
                                  Ragnarok
                                  
                            </h1>
                         </Link>
                        
                        
                           <div className="btn-group">
                           <div className="form-inline ml-3 mr-3">
                             <Link to="/anuncio" className="btn btn-outline-warning ">Novo Anúncio</Link>
                           </div>
                           <div>
                           <Link
                              className="nav-link">
                             <span>Bem vindo, {usuario.nome} </span>
                            </Link>
                         
                            </div>
                            <div className="btn-group">
                            
                            </div>
                             
                            <div className="btn-group ">
                           
                            <button type="button" className="btn btn-secondary dropdown-toggle mr-2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                            <GiBrutalHelm/>
                            </button> 
                            
                            <div className="dropdown-menu dropdown-menu-right">
                              
                                  <button className="dropdown-item" type="button"> Bem vindo, Diego    </button> 
                                <button className="dropdown-item" type="button">Meus Anúncios</button>
                                <button className="dropdown-item" type="button">Meus Jogos</button>
                                <button className="dropdown-item" type="button">Configurações</button>
                                <Link to="/logout">
                                  <button className="dropdown-item" type="button">Sair</button>
                                </Link>
                                
                            </div> 
                            </div>
                               
                             
                           </div>
                              
                     
                      </div>
                      
                    </div>
                  <div style={zindex} className="header mb-5 shadow-lg position-fixed">
              
                 
                 
                 </div>
                 </>
              )
        }
    }
}


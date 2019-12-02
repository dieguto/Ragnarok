import React, { Component } from 'react';
import {Link} from 'react-router';
import { GiBrutalHelm } from 'react-icons/gi';
import 'bootstrap/js/dist/util'
import bell from '../assets/bell.png'



export default class Menu extends Component{

    

    render(){

      const bellnotification = {"width":"20px","height":"20px","cursor":"pointer"};
      const zindex = {"z-index":"9999","width":"100%"}
     

        if(sessionStorage.getItem('token') === null){
          
            return (
                <div className="header">
                  <div className="navbar navbar-light bg-dark">
                  
                    <Link to="/" className="navbar-brand">
                      <h1 className="navbar-brand text-warning">
                        Ragnarok
                      </h1>
                    </Link>
                    
                    <div className="form-inline">
                        <Link to="/login" className="btn btn-outline-warning">Entrar</Link>
                        <Link to="/cadastroUsuario" className="btn btn-outline-warning ml-3">Cadastrar-se</Link>
                    </div>
                      
                  </div>
                </div>
              )
        }else{
      const usuario = JSON.parse(sessionStorage.getItem('usuario'));
      console.log(usuario);
            return (
                <>
                <div style={zindex} className="header shadow-lg position-fixed mb-5">
              
                       {/* Segundo menu */}
                       <div className="navbar navbar-light bg-dark">
                         <Link to="/">
                            <h1 className="navbar-brand text-warning font1">                      
                                  Ragnarok
                            </h1>
                         </Link>
                        
                        
                        
                           <div className="btn-group">
                           <div className="form-inline ml-3 mr-3">
                             <img style={bellnotification} src={bell} ></img>
                           </div>
                           <div className="form-inline ml-3 mr-3">
                             <Link to="/anuncio" className="link">
                                <div class="teste teste1 align-items-center font1 text-center">
                                  <span>Novo Anúncio</span>
                                </div>
                             </Link>
                           </div>
                           <div>
                           <Link
                              className="nav-link font1">
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

                              
                                <button className="dropdown-item font1" type="button">Meus Anúncios</button>
                                <button className="dropdown-item font1" type="button">Meus Jogos</button>
                                <Link to="/chat">
                                  <button className="dropdown-item font1" type="button">Chat</button>
                                </Link>
                                
                                
                                <Link to="/editarUsuario">
                                  <button className="dropdown-item font1" type="button">Configurações</button>
                                </Link>
                                <Link to="/logout">
                                  <button className="dropdown-item font1" type="button">Sair</button>
                                </Link>
                                
                            </div> 
                            </div>
                               
                             
                           </div>
                              
                     
                      </div>
                      
                    </div>
                  <div className="header menu-cover shadow-lg">
              
                 
                 
                 </div>
                 </>
              )
        }
    }
}


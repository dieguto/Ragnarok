import React , {Component} from 'react';

import Cleave from 'cleave.js/dist/cleave-react'
import '../css/Cadastro.css'


export default class CadastroUsuario extends Component {

    render(){
        return(
            <div className="login-container">
                   
                        <form method="post" name="formcadastro">   
                                <h1>Cadastro</h1> 

                                <div>
                                    <label className="form-check-label ">Nome:</label>
                                    <input className="form-control " type="text" id="nome" name="nome"  placeholder="Guilherme caneiro" required></input>
                                </div>
                                <div>
                                    <label className="form-check-label">Cep:</label>
                                    <Cleave type="text" id="cep" name="cep"  required className="form-control" placeholder="06233-085" options={{blocks: [5,3], delimiter:"-", numericOnly:true}}></Cleave>
                                </div>
                                <div>
                                    <label className="form-check-label">email:</label>
                                    <input className="form-control" type="email" id="email" name="email"  placeholder="guimanchaverde@email.com" required></input>
                                </div>
                                
                                <div>
                                    <label className="form-check-label">Senha:</label>
                                    <input className="form-control" type="password" id="senha" name="senha" placeholder="*******" required></input>
                                </div>

                            <div className="text-center">
                                <button className="btn btn-outline-warning" type="submit">Cadastrar</button>
                            </div>
                            
                                
                                
                            
                        </form> 

                    
                </div>
        )
    }


}
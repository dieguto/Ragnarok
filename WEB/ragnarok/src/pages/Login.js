import React, { Component, Fragment }  from 'react';
import ListErrors from '../components/ListErrors';
import agent from '../agent';
import { connect } from 'react-redux';

import $ from 'jquery';
import './css/Cadastro.css'
import InputFormulario from '../components/inputFormulario';




const mapStateToProps = state => ({ ...state.auth});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'senha', value }),
  onSubmit: (email, senha) =>
    dispatch({ type: 'LOGIN', payload: agent.Auth.login(email, senha) })
})

class Login extends Component{
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = (email, senha) => ev => {
          ev.preventDefault();
          this.props.onSubmit(email, senha);
        };
      }
    
    // constructor(){
    //     super();
    //     this.state = {email:'', senha: ''};
    //     this.setEmail = this.setEmail.bind(this);
    //     this.setSenha = this.setSenha.bind(this);
    //     this.enviarForm = this.enviarForm.bind(this);
    // }

    

    // setEmail(event){
    //     this.setState({email:event.target.value});
    //     console.log(this.state.email)
    // }

    // setSenha(event){
    //     this.setState({senha:event.target.value});
    //     console.log(this.state.senha)
    // }

    // enviarForm(event){
    //     event.preventDefault();
    //     // const counter = useSelector(state => state.counter);
    //     // const isLogged = useSelector(state => state.isLogged);
    //     // const dispatch = useDispatch();
    //     $.ajax({
    //         url: 'http://localhost:3107/auth/login/usuario',
    //         contentType: 'application/json',
    //         dataType:'json',
    //         type:'post',
    //         data: JSON.stringify(
    //             {
    //                 email:this.state.email,
    //                 senha:this.state.senha
    //             }
    //         ),
    //         success: function(resposta){
    //             console.log(resposta)
    //             const { id } = resposta.usuario;
                
    //             window.location.href = `/usuario/${id}`;
    //         }.bind(this)

    //     })

    // }

    render(){
        const email = this.props.email;
        const senha = this.props.senha;

        return(
            <div className="login-container">

                <ListErrors errors={this.props.errors}/>

                <form onSubmit={this.submitForm(email,senha)} method="post">   
                    <h1>Login</h1> 
                <div>
                    <div>
                        <label className="form-check-label">E-mail:</label>
                        <input className="form-control" type="email" id="email" name="email" placeholder="batatinhaxpto@senaisp.com" value={email} onChange={this.changeEmail} required></input>
                        
                    </div>
                    <div>
                        <label className="form-check-label">Senha:</label>
                        <input className="form-control" type="password" id="senha" name="senha" placeholder="*****" value={senha} onChange={this.changePassword} required></input>
                    </div>

                    <div className="text-center">
                        
                        <button className="btn btn-outline-warning" disabled={this.props.inProgress} type="submit">Entrar</button>
                        {/* <button onClick={() => dispatch(increment(5))}>+</button> */}
                        {/* <button onClick={() => dispatch(decrement(5))}>-</button> */}
                    </div>
                </div>
            </form>
            </div>
            
        )
      }
    
}

  



// export class LoginBox extends Component{

//     render(){
//         return(
//             <Fragment>
//                 <Login></Login>
//             </Fragment>
//         )
//     }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React, {Component} from 'react';
import {browserHistory} from  'react-router';
import '../css/cadastro-anuncio.css'
import '../css/Cadastro.css';
import { ERRO, Notificacao, INFO, AVISO, PADRAO, CAMPO_VAZIO, SUCESSO } from '../Alerta';

import { ErrorMessage, Formik, Form as FormikForm, Field } from 'formik';
import PropTypes from 'prop-types';
import * as yup from 'yup';

const handleSubmit = values => alert(JSON.stringify(values));
const initialValues = {};

const validarFomulario = yup.object().shape({
    email: yup.string()
    .required('Informe o E-mail!')
    .min(5, 'O E-mail deve conter mais de 5 letras!')
    .max(100, 'O E-mail deve conter menos de 100 letras!')
    .email('Informe um E-mail válido'),
    senha: yup.string()
    .required('Informe a Senha!')
    .min(5, 'A senha deve conter mais de 5 caracteres!')
    .max(200, "A senha deve conter menos de 20 caracteres!")
})

const Form = ({ handleSubmit, initialValues }) => (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validarFomulario}>            
        <FormikForm className="mb-5">
            <div class="form-group">
                <label className="form-check-label">E-mail:</label>
                <Field  type="text" name="email" className="form-control" placeholder="batatinhaxpto@senaisp.com" ref={(input) => this.login = input}/>                
                <ErrorMessage component="span" name="email"/>
            </div>

            <label className="form-check-label">Senha:</label>
            <Field className="mb-4" type="password" name="senha" placeholder="5dbni?" ref={(input) => this.senha = input}/>
            <ErrorMessage component="span" name="senha"/>

                <input className="btn btn-outline-warning" type="submit" value="Entrar"/>
            
        </FormikForm>
    </Formik>
)

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired
}

export default class Login extends Component {

    constructor(props){
        super(props);        
        this.state = {msg:this.props.location.query.msg};
    }

    envia(event){
        event.preventDefault();

        /* é criado a constante requestInfo, por que por padrão o fetch realiza um get
        porém, como estamos lidando com dados do usuário, devemos utilizar um POST*/ 
        const requestInfo = {
            method:'POST',
            // body:JSON.stringify({login:this.login.value,senha:this.senha.value}),
            body:JSON.stringify({email:this.login.value,senha:this.senha.value}), //versão para o TCC
            headers:new Headers({
                'Content-type' : 'application/json',
                // 'Authorization' : 'Bearer ' + token 
            })
        };

       
        fetch('http://3.92.51.72:3107/auth/login/usuario',requestInfo) // Versão para o TCC
            .then(response => {
                //o "ok" é do proprio response, que retorna um boolean
                if(response.ok) {
                   
                    return response.text();
                } else {
                    // criamos um novo erro, para interromper o fluxo
                    // Notificacao(INFO, CAMPO_VAZIO)
                    throw new Error('não foi possível fazer o login');
                    
                }
            })
            .then(dadosUsuario => {
                dadosUsuario = JSON.parse(dadosUsuario);
                sessionStorage.setItem('token', dadosUsuario.token);
                sessionStorage.setItem('usuario', JSON.stringify(dadosUsuario.usuario));
                
                browserHistory.push('/');
            })
           
            
            .catch(error => {
                this.setState({msg:error.message});
            });
    }

    render(){
        return (

            <>
                <h1 className="header-logo titulo-cadastro-anuncio mt-5">Login</h1>
                <div className="row">
                    <div className="col-3.5 mr-auto ml-auto"><hr className="accent-2 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
                </div>                
                <p className="text-center cor-erro">{this.state.msg}</p>
                <div className="login-container">
                    <form className="mb-5" onSubmit={this.envia.bind(this)}>
                        <label className="form-check-label">E-mail:</label>
                        <input type="text" placeholder="batatinhaxpto@senaisp.com" name="name" ref={(input) => this.login = input}/>
                        <label className="form-check-label">Senha:</label>
                        <input className="mb-4" type="password" placeholder="5dbni?" ref={(input) => this.senha = input}/>
                        {/* onClick={() => Notificacao(ERRO, this.state.msg)} */}
                        <input className="btn btn-outline-warning" type="submit" value="Entrar" />
                    </form>
                    {/* <Form handleSubmit={this.envia.bind(this)} initialValues={initialValues}>      
                                   
                    </Form>                     */}
                </div>
            </>
        );
    }
}

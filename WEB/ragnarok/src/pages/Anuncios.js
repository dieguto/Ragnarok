import React, { Component, Fragment } from 'react';
import './css/Cadastro.css'

export class FormularioAnuncio extends Component {

    constructor(){
        super();
        this.state = {
        titulo:'',
        descricao:'',
        is_jogo:'',
        is_console:'',
        is_acessorio:'',
        id_genero:'',
        slug_jogo:'',
        id_console_troca:'',
        slug_jogo_troca:'',
        preco:'',
        array_fotos_base64:''};
        this.setTitulo = this.setTitulo.bind(this);
        this.setDescricao = this.setDescricao.bind(this);
        this.setIsJogo = this.setIsJogo.bind(this);
        this.setIsConsole = this.setIsConsole.bind(this);
        this.setIsAcessorio = this.setIsAcessorio.bind(this);
        this.setIsIdGenero = this.setIdGenero.bind(this);
        this.setSlugJogo = this.setSlugJogo.bind(this);
        this.setid_console_troca = this.setIdConsoleTroca.bind(this);
        this.setSlugJogoTroca = this.setSlugJogoTroca.bind(this);
        this.setPreco = this.setPreco.bind(this);
    }

    setTitulo(event){
        this.setState({titulo:event.target.value});
        console.log(this.state.titulo)
    }

    setDescricao(event){
        this.setState({descricao:event.target.value});
        console.log(this.state.descricao)
    }

    setIsJogo(event){
        this.setState({is_jogo:event.target.value});
        console.log(this.state.is_jogo)
    }

    setIsConsole(event){
        this.setState({is_console:event.target.value});
        console.log(this.state.is_console)
    }

    setIsAcessorio(event){
        this.setState({is_acessorio:event.target.value});
        console.log(this.state.is_acessorio)
    }

    setIdGenero(event){
        this.setState({id_genero:event.target.value});
        console.log(this.state.id_genero)
    }

    setSlugJogo(event){
        this.setState({slug_jogo:event.target.value});
        console.log(this.state.slug_jogo)
    }

    setIdConsoleTroca(event){
        this.setState({id_console_troca:event.target.value});
        console.log(this.state.id_console_troca)
    }

    setSlugJogoTroca(event){
        this.setState({slug_jogo_troca:event.target.value});
        console.log(this.state.slug_jogo_troca)
    }

    setPreco(event){
        this.setState({preco:event.target.value});
        console.log(this.state.preco)
    }

    setArrayFotosBase64(event){
        this.setState({array_fotos_base64:event.target.value});
        console.log(this.state.array_fotos_base64)
    }

    enviarForm(event){
        event.preventDefault();


    }

    render(){

        return(
            <div className="login-container">
                <form onSubmit={this.enviarForm} method="post">
                    <h1>Cadastro Anuncio</h1> 
                <div>
                    <div>
                        <label className="form-check-label">Titulo:</label>
                        <input className="form-control" type="titulo" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} required></input>          
                    </div>
                    
                    <div>
                        <label className="form-check-label">Descrição:</label>
                        <input className="form-control" type="titulo" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} required></input>          
                    </div>

                    {/* <div>
                        <label className="form-check-label">O que você está anunciando:</label>
                        <input className="form-check-input" type="radio" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.is_jogo} onChange={this.setTitulo} ></input>          
                        <input className="form-check-input" type="radio" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} ></input>          
                        <input className="form-check-input" type="radio" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} ></input>          
                    </div> */}

                    {/* <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                        <label className="form-check-label" for="exampleRadios1">
                            Default radio
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                        <label className="form-check-label" for="exampleRadios1">
                            Default radio
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                        <label className="form-check-label" for="exampleRadios1">
                            Default radio
                        </label>
                    </div> */}


                    <div>
                        <label className="form-check-label">Titulo:</label>
                        <input className="form-control" type="titulo" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} required></input>          
                    </div>

                    <div>
                        <label className="form-check-label">Titulo:</label>
                        <input className="form-control" type="titulo" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} required></input>          
                    </div>

                    <div>
                        <label className="form-check-label">Titulo:</label>
                        <input className="form-control" type="titulo" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} required></input>          
                    </div>

                    <div>
                        <label className="form-check-label">Titulo:</label>
                        <input className="form-control" type="titulo" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} required></input>          
                    </div>

                    <div>
                        <label className="form-check-label">Titulo:</label>
                        <input className="form-control" type="titulo" id="titulo" name="titulo" placeholder="Pitfall" value={this.state.titulo} onChange={this.setTitulo} required></input>          
                    </div>

                    <div className="text-center">
                        
                        {/* <button className="btn btn-outline-warning" disabled={!this.state.email} type="submit">Entrar</button> */}
                        {/* <button onClick={() => dispatch(increment(5))}>+</button> */}
                        {/* <button onClick={() => dispatch(decrement(5))}>-</button> */}
                    </div>
                </div> 
                </form>
            </div>
        )
    }
}


export class AnuncioBox extends Component{

    render(){
        return(
            <Fragment>
                <FormularioAnuncio></FormularioAnuncio>
            </Fragment>
        )
    }
}
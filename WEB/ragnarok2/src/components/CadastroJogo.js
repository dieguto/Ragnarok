import React, {Component} from 'react';
import '../css/cadastro-anuncio.css';
import {browserHistory} from 'react-router';

import ImgTeste from '../assets/god-of-war.jpg'
import ImgUtils from '../components/ImgUtils';
import { ERRO, Notificacao, INFO, AVISO, PADRAO, CAMPO_VAZIO, SUCESSO, SUCESSO_CADASTRO } from '../Alerta';
import $ from 'jquery';

export default class CadastroJogo extends Component {

  constructor(){
    super();
    this.state = {sugestao:"",
     generos:[], generoSelecionado: "", consoles:[],
     consoleSelecionado: "",jogos: [], jogoSelecionado: ""};
  }

  transformar(){
    console.log("transformando")
    //this.getById("erro").style.display = "none";
    //this.getById("erro").innerHTML = "";
    
    const cs = new CadastroJogo();

    ImgUtils.convParaBase64(cs.getById("imgs"))
    .then(()=>{
        ImgUtils.carregarParaDiv(cs.getById("imgs_div"))
        .catch(err =>{
          console.log(cs.getById("imgs").files)
          cs.getById("imgs").value = null;
          alert(err)
        })
    })
    .catch(err =>{
      alert(err)
    })
  }

  getById(elemento){
    console.log("estou aqui na linha 28")
    console.log(document.getElementById(elemento));
    return document.getElementById(elemento);
  }

  componentWillMount(){
    ImgUtils.setOpcoes();
  }

  salvarJogo(jogo){
    // console.log(jogo);
    this.setState({jogoSelecionado:jogo})
    // sessionStorage.setItem('jogo', jogo)

    setTimeout(() => {
        
      console.log(this.state.jogoSelecionado)
    }, 1500);
  }

  pesquisa(event){
    event.preventDefault()
    fetch(`http://3.92.51.72:3107/sugestoes/${this.jogoPesquisado.value}/10`)
    .then(response => response.json())
    .then(jogos => {
      this.setState({jogos:jogos})
      console.log(jogos)
    })    
    
  }

  getGenero(){
    fetch('http://3.92.51.72:3107/genero/todos')
        .then(response => response.json())
        .then(generos => {
            this.setState({generos:generos})
            console.log(generos)
        })

  }

  getConsoles(){
    fetch('http://3.92.51.72:3107/console/todos')
    .then(response => response.json())
    .then(consoles => {
        this.setState({consoles:consoles})
        console.log(consoles)
    })
  }

  getGeneroSelecionado(event){

    var estado = event.target.value;
    this.setState({generoSelecionado:estado})

    setTimeout(() => {
      
      console.log(this.state.generoSelecionado)
    }, 1500);

    // dadosGenero = this.state.generoSelecionado;
  }

  getConsolesSelecionado(event){

    var estado = event.target.value;
    this.setState({consoleSelecionado:estado})

    setTimeout(() => {
      
      console.log(this.state.consoleSelecionado)
    }, 1500);
  }

  componentDidMount(){
    this.getGenero();
    this.getConsoles();

  }

  

  // envia(event){
  //   event.preventDefault();

  //   const cs = new CadastroConsole();

  //   const token = sessionStorage.getItem("token")

  //   ImgUtils.fotosDaDivParaBase64(cs.getById("imgs_div"))
  //   .then(array_fotos_base64 => {
  //     const requestInfo = {
  //       method: 'POST',
  //       body:JSON.stringify(
  //         {
  //           titulo:this.titulo.value,
  //           descricao:this.descricao.value,
  //           is_jogo:true,
  //           is_console: false,
  //           is_acessorio: false,
  //           id_genero: this.state.generoSelecionado,
  //           id_console: this.state.consoleSelecionado,
  //           slug_jogo: this.state.jogoSelecionado,
  //           id_console_troca: null,
  //           slug_jogo_troca: null,
  //           preco: this.preco.value,
  //           // array_fotos_base64: array_fotos_base64,
  //         }),
  //         } 

  //         setTimeout(() => {
      
  //           console.log(this.state.generoSelecionado)
  //         }, 1500);

  //     console.log(requestInfo)
  // }

  enviar(e){
    e.preventDefault();

    const cs = new CadastroJogo();

    const token = sessionStorage.getItem("token")

    ImgUtils.fotosDaDivParaBase64(cs.getById("imgs_div"))
    .then(array_fotos_base64 => {
    
    const requestInfo = {
      method:'POST',
      body:JSON.stringify(
        {
          titulo:this.titulo.value,
          descricao:this.descricao.value,
          is_jogo:true,
          is_console: false,
          is_acessorio: false,
          id_genero: this.state.generoSelecionado,
          id_console: this.state.consoleSelecionado,
          slug_jogo: this.state.jogoSelecionado,
          id_console_troca: null,
          slug_jogo_troca: null,
          preco: this.preco.value,
          array_fotos_base64: array_fotos_base64,
        }),
  
      headers:new Headers({
        'Content-type' : 'application/json',
        'Authorization' : 'Bearer ' + token 
      }),

      
    }
    

    
    fetch('http://3.92.51.72:3107/anuncio', requestInfo)
    .then(response => {
      if(response.ok){
        Notificacao(SUCESSO, SUCESSO_CADASTRO)
        return response.text();
      } else {
        // throw new Error('não foi possível realizar o cadastro');
      }
    })
    .then(jogo =>{
      
      browserHistory.push('/sucesso');
    })
    
    })
    .catch(err => {
      alert(err)
    });    
  }   
    

    

    render(){
        return(
                <div id="container">

                  <h1 class="titulo-cadastro-anuncio">Cadastro de Jogo</h1>
                  <div class="row">
                      <div class="col-3.5 mr-auto ml-auto"><hr class="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
                  </div>               
                  <div id="container-cadastro-anuncio">
                    <form className="form-cadastro" onSubmit={this.enviar.bind(this)}>
                      <div className="form-group">
                        <label for="" className="texto-laranja">Titulo:</label>
                        <input type="text" className="form-control" id="" placeholder="Digite o titulo do produto" ref={(input) => this.titulo = input}/>
                      </div>
                      <div className="form-group">
                        <label for="" className="texto-laranja">Descrição:</label>
                        <input type="text" className="form-control" id="" placeholder="Descreva seu produto" ref={(input) => this.descricao = input}/>
                      </div>
                      {/* <SelectGenero></SelectGenero>
                       */}
                      <div className="form-group">
                      <label for="" className="texto-laranja">Gênero:</label>
                      <select className="custom-select" onChange={e => this.getGeneroSelecionado(e)}>
                          {
                              this.state.generos.map(
                                  genero => <option value={genero.id_genero} key={genero.id_genero} >{genero.nome}</option>
                              )

                            
                          }
                      
                </select>
                      </div>
                         <div className="form-group">
                        <label className="texto-laranja">Console do Jogo:</label>
                          <select className="custom-select" onChange={e => this.getConsolesSelecionado(e)}>
                                    {
                                        this.state.consoles.map(
                                            console => <option value={console.id_console} key={console.id_console} >{console.nome}</option>
                                        )
                                    }
                          </select>
                      </div>
                    
                      <div className="form-group">
                        <label for="" className="texto-laranja">Preço:</label>
                        <input type="number" className="form-control" id="" placeholder="Digite o preço do produto" ref={(input) => this.preco = input}/>
                      </div>
                      
                      {/* Retornando o jogo selecionado */}
                      <div className="form-group">
                        <div className="form-group">
                          <label for=""className="texto-laranja">Digite o nome do jogo:</label>
                          <div class="input-group">
                            <input type="text" className="form-control texto-laranja rounded" id=""  placeholder="God of War" aria-describedby="button-addon4" ref={input => this.jogoPesquisado = input} />
                            <div class="input-group-append" id="button-addon4">
                              <input type="button" onClick={this.pesquisa.bind(this)} className="btn-pesquisar rounded" cals value="Pesquisar" />
                            </div>
                          </div>
                        </div>
                      {
                        this.state.jogos.map(
                          jogo => 
                          <div key={jogo.slug_jogo} class="form-group caixa-jogo background-333333">
                            <div className="row">
                                <div className="col-4 card bg-transparent border-0">
                                    <div className="card-header bg-transparent border-0"><h5 className="card-title texto-laranja">{jogo.nome}</h5></div>
                                    <div className="card-body bg-transparent border-0"><button type="button" onClick={e => this.salvarJogo(jogo.slug)} className="btn-confirmar mr-auto ml-auto">Clique aqui para confirmar</button></div>
                                </div>
                                <div className="col-8">
                                    <img src={jogo.imagem_fundo} className="card-img"></img>
                                </div>
                            </div>      
                        </div> 
                        )
                      }
                                  
                  
                    </div>

                      <div class="form-group">
                      <div className="form-group">
                        <div className="custom-file">
                          <input name="imgs" id="imgs" onChange={this.transformar} type="file" multiple className="custom-file-input"/>
                          <label className="custom-file-label" >Selecione a foto do produto que deseja anunciar</label>
                        </div>
                      </div>
                     
                     
                      </div>
                      <div class="form-group">
                        <div className="row">
                          <div class="background-333333 mr-auto ml-auto card caixa-imagem col-6">
                            <div className="card-body mr-auto ml-auto">
                              <div className="float-left " id="imgs_div"></div>
                            </div>
                          </div>
                        </div>
                      </div>        
                      <button type="submit" className="btn btn-outline-warning btn-cadastro">Cadastrar</button>
                    </form>        
                  </div>
          
           </div>
        );
    }

}
import React, {Component} from 'react';
import '../css/cadastro-anuncio.css';
import $ from 'jquery';
import ImgUtils from '../components/ImgUtils';
import {browserHistory} from  'react-router';

export default class CadastroConsole extends Component{

  constructor(props){
    super(props);
    this.state = {consoles: [], consoleSelecionado: ""}
  }

  getConsoles(){
    fetch('http://3.92.51.72:3107/console/todos')
      .then(response => response.json())
      .then(consoles => {
          this.setState({consoles:consoles})
          console.log(consoles)
      })
  }

  getConsoleSelecionado(event){
    var estado = event.target.value;
    this.setState({consoleSelecionado:estado})

    setTimeout(() => {
      
      console.log(this.state.consoleSelecionado)
    }, 1500);
  }

  transformar(){
    console.log("transformando")
    //this.getById("erro").style.display = "none";
    //this.getById("erro").innerHTML = "";
    
    const cs = new CadastroConsole();

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
    // console.log("estou aqui na linha 28")
    console.log(document.getElementById(elemento));
    return document.getElementById(elemento);
  }

  componentWillMount(){
    ImgUtils.setOpcoes();
  }

  
  componentDidMount(){
    this.getConsoles();
  }

  enviar(e){
    e.preventDefault();

    const cs = new CadastroConsole();

    const token = sessionStorage.getItem("token")

    ImgUtils.fotosDaDivParaBase64(cs.getById("imgs_div"))
    .then(array_fotos_base64 => {
    
    const requestInfo = {
      method:'POST',
      body:JSON.stringify({
        titulo:this.titulo.value,
        descricao:this.descricao.value,
        is_jogo:false,
        is_console:true,
        is_acessorio:false,
        id_genero:null,
        id_console: this.state.consoleSelecionado,
        slug_jogo:null,
        id_console_troca:null,
        slug_jogo_troca:null,
        preco: this.preco.value,
        array_fotos_base64: array_fotos_base64
      }),
  
      headers:new Headers({
        'Content-type' : 'application/json',
        'Authorization' : 'Bearer ' + token 
      }),

      
    }
    

    
    fetch('http://3.92.51.72:3107/anuncio', requestInfo)
    .then(response => {
      if(response.ok){
        return response.text();
       
      } else {
        // throw new Error('não foi possível realizar o cadastro');
      }
    })
    .then(console =>{
      
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

            <h1 className="titulo-cadastro-anuncio">Cadastro de Console</h1>
                <div className="row">
                    <div className="col-3.5 mr-auto ml-auto"><hr className="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
                </div>
            <div id="container-cadastro-anuncio">
              <form className="form-cadastro" onSubmit={this.enviar.bind(this)}>
                <div className="form-group">
                  <label>Titulo:</label>
                  <input type="text" className="form-control" id="" placeholder="Digite o titulo do produto" ref={(input) => this.titulo = input}/>
                </div>
                <div className="form-group">
                  <label>Descrição:</label>
                  <input type="text" className="form-control" id="" placeholder="Descreva seu produto" ref={(input) => this.descricao = input}/>
                </div>
                <div className="form-group">
                   <div className="form-group">
                    <label className="texto-laranja">Console:</label>
                    <select className="custom-select" onChange={e => this.getConsoleSelecionado(e)}>
                        {
                            this.state.consoles.map(
                                console => <option value={console.id_console} key={console.nome} >{console.nome}</option>
                            )

                          
                        }
                    
                    </select>
                </div>

                </div>
                <div className="form-group">
                  <label >Preço:</label>
                  <input type="text" className="form-control" id="" placeholder="Digite o preço do produto" ref={(input) => this.preco = input}/>
                </div>
                <div className="form-group">
                  <div className="custom-file">
                    <input name="imgs" id="imgs" onChange={this.transformar} type="file" multiple className="custom-file-input"/>
                    <label className="custom-file-label" >Selecione a foto do produto que deseja anunciar</label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="background-333333 mr-auto ml-auto caixa_imagem"></div>
                </div>
                <div className="row">
                  <div class="background-333333 mr-auto ml-auto card caixa-imagem col-6">
                    <div className="card-body mr-auto ml-auto">
                      <div className="float-left " id="imgs_div"></div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-cadastro">Cadastrar</button>
              </form>      
            </div>  
      
          </div>
        )

    }
}
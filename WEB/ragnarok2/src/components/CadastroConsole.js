import React, {Component} from 'react';
import '../css/cadastro-anuncio.css';
import $ from 'jquery';
import ImgUtils from '../components/ImgUtils';

class SelectConsole extends Component{
    constructor(){
      super();
      this.state = {consoles: []}
    }

    componentDidMount(){
      fetch('http://3.92.51.72:3107/console/todos')
        .then(response => response.json())
        .then(consoles => {
            this.setState({consoles:consoles})
            console.log(consoles)
        })
    }

    render(){
      return(
          <div className="form-group">
              <label for="" className="texto-laranja">Gênero:</label>
              <select className="custom-select">
                  {
                      this.state.consoles.map(
                          console => <option value={console.id} key={console.id} >{console.nome}</option>
                      )

                    
                  }
              
              </select>
          </div>
      )
  }

}

export default class CadastroConsole extends Component{

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
    console.log("estou aqui na linha 28")
    console.log(document.getElementById(elemento));
    return document.getElementById(elemento);
  }

  componentWillMount(){
    ImgUtils.setOpcoes();
  }

  enviar(e){
    e.preventDefault();
    
    const cs = new CadastroConsole();

  //this.getById("erro").style.display = "none";
  //this.getById("erro").innerHTML = "";

  const token = sessionStorage.getItem("token")
    ImgUtils.fotosDaDivParaBase64(cs.getById("imgs_div"))
    .then(array_fotos_base64 => {
    const requestInfo ={
      method:'POST',
      body:JSON.stringify({
        titulo:this.titulo.value,
        descricao:this.descricao.value,
        is_jogo:false,
        is_console:true,
        is_acessorio:false,
        id_genero:null,
        id_console: this.console.value,
        slug_jogo:null,
        id_console_troca:null,
        slug_jogo_troca:null,
        preco: 300.00,
        array_fotos_base64: array_fotos_base64
      }),
      headers:new Headers({
        'Content-type' : 'application/json',
        'Authorization' : 'Bearer ' + token 
      })
    }
      fetch('http://3.92.51.72:3107/anuncio', requestInfo)
      console.log(array_fotos_base64)

    })
    .catch(err => {
      alert(err)
    });    
  }    

    constructor(props){
      super(props);
    }

    render(){

        return(
          
            <div id="container">

            <h1 class="titulo-cadastro-anuncio">Cadastro de Console</h1>
                <div class="row">
                    <div class="col-3.5 mr-auto ml-auto"><hr class="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
                </div>
            <div id="container-cadastro-anuncio">
              <form class="form-cadastro" onSubmit={this.enviar}>
                <div class="form-group">
                  <label for="">Titulo:</label>
                  <input type="text" class="form-control" id="" placeholder="Digite o titulo do produto" ref={(input) => this.titulo = input}/>
                </div>
                <div class="form-group">
                  <label for="">Descrição:</label>
                  <input type="text" class="form-control" id="" placeholder="Descreva seu produto" ref={(input) => this.descricao = input}/>
                </div>
                <div class="form-group">
                  {/* <label for="">Console do Jogo:</label>
                  <select class="custom-select">
                      <option selected>Selecione um Console</option>
                  </select> */}
                  <SelectConsole/>
                </div>
                <div class="form-group">
                  <label for="">Preço:</label>
                  <input type="number" class="form-control" id="" placeholder="Digite o preço do produto" ref={(input) => this.preco = input}/>
                </div>
                <div class="form-group">
                  <div class="custom-file">
                    <input name="imgs" id="imgs" onChange={this.transformar} type="file" multiple class="custom-file-input"/>
                    <label class="custom-file-label" for="">Selecione a foto do produto que deseja anunciar</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="background-333333 mr-auto ml-auto caixa_imagem"></div>
                </div>
                <div id="imgs_div"></div>
                <button type="submit" class="btn btn-cadastro">Cadastrar</button>
              </form>      
            </div>  
      
          </div>
        )

    }
}
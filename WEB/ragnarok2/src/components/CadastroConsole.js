import React, {Component} from 'react';
import '../css/cadastro-anuncio.css';
import $ from 'jquery';
import ImgUtils from '../components/ImgUtils';

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
    
      fetch()
      console.log(array_fotos_base64)

    })
    .catch(err => {
      alert(err)
    });    
  }    
  //   }
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
                  <input type="text" class="form-control" id="" placeholder="Digite o titulo do produto"/>
                </div>
                <div class="form-group">
                  <label for="">Descrição:</label>
                  <input type="text" class="form-control" id="" placeholder="Descreva seu produto"/>
                </div>
                <div class="form-group">
                  <label for="">Console do Jogo:</label>
                  <select class="custom-select">
                      <option selected>Selecione um Console</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="">Preço:</label>
                  <input type="number" class="form-control" id="" placeholder="Digite o preço do produto"/>
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
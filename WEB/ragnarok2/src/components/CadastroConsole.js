import React, {Component} from 'react';
import '../css/cadastro-anuncio.css';

export default class CadastroConsole extends Component{
    render(){
        return(
            <div id="container">

            <h1 class="titulo-cadastro-anuncio">Cadastro de Jogo</h1>
                <div class="row">
                    <div class="col-3.5 mr-auto ml-auto"><hr class="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
                </div>
            <div id="container-cadastro-anuncio">
              <form class="form-cadastro">
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
                    <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                    <label class="custom-file-label" for="">Selecione a foto do produto que deseja anunciar</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="background-333333 mr-auto ml-auto caixa_imagem"></div>
                </div>
                <button type="submit" class="btn btn-cadastro">Cadastrar</button>
              </form>      
            </div>  
      
          </div>
        )

    }
}
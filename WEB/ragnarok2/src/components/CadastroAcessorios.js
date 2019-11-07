import React,{Component} from 'react';
import '../css/cadastro-anuncio.css';


export default class CadastroAcessorio extends Component{
    render(){
        return(
            <div id="container">

            <h1 class="titulo-cadastro-anuncio">Cadastro de Acessórios</h1>
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
                  <label for="">Gênero:</label>
                  <select class="custom-select">
                    <option selected>Selecione um Gênero</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="">Console do Jogo:</label>
                  <select class="custom-select">
                    <option selected>Selecione um Console</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="">Digite o nome do jogo que possui:</label>
                  <input type="text" class="form-control" id="" placeholder="God of War"/>
                </div>
                <div class="container caixa-jogo form-group">
                  <div class="row">
                    <div class="col-4">
                      <div class="row"><h5 class="card-title">God of War:</h5></div>
                      <div class="row"><button type="button" class="btn btn-confirmar">Clique aqui para confirmar</button></div>
                    </div>
                    <div class="col-8">
                      <img src="img/god-of-war.jpg" class="card-img" alt="" title=""/>
                    </div>
                  </div>                  
                </div>
                <div class="form-group">
                  <label for="">Digite o nome do jogo que quer trocar:</label>
                  <input type="text" class="form-control" id="" placeholder="God of War"/>
                </div>
                <div class="container caixa-jogo form-group">
                  <div class="row">
                    <div class="col-4">
                      <div class="row"><h5 class="card-title">God of War:</h5></div>
                      <div class="row"><button type="button" class="btn btn-confirmar">Clique aqui para confirmar</button></div>
                    </div>
                    <div class="col-8">
                      <img src="img/god-of-war.jpg" class="card-img" alt="" title=""/>
                    </div>
                  </div>                  
                </div>    
                <div class="form-group">
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
                    <label class="custom-file-label" for="">Selecione a foto do produto</label>
                  </div>
                </div>
                <div class="form-group">
                  <div id="" class="background-333333 mr-auto ml-auto caixa_imagem"></div>
                </div>        
                <button type="submit" class="btn btn-cadastro">Cadastrar</button>
              </form>        
            </div>
            
          </div>
        )
    }
}
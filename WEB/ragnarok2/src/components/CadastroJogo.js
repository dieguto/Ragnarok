import React, {Component} from 'react';
import '../css/cadastro-anuncio.css'


import ImgTeste from '../assets/god-of-war.jpg'

class RetornaJogo extends Component {

  pesquisa(event){
    event.preventDefault()
    fetch(`http://localhost:3107/sugestoes/${this.jogoPesquisado.value}/5`)
    .then(response => response.json())
    .then(jogos => {
      console.log(jogos)
    })    
    
  }

  render(){
    return(
      <div className="container">
        <form onSubmit={this.pesquisa.bind(this)}>
          <div className="form-group">
            <label for=""className="texto-laranja">Digite o nome do jogo:</label>
            <input type="text" className="form-control texto-laranja" id=""  placeholder="God of War" ref={input => this.jogoPesquisado = input} />
            <input type="submit" value="pesquisar" />
          </div>
        </form>
        
        <div class="container caixa-jogo">
          <div className="row">
            <div className="col-4">

                <div className="row"><h5 className="card-title texto-laranja">God of War:</h5></div>
                <div className="row"><button type="button" className="btn-confirmar">Clique aqui para confirmar</button></div>
              
              
            </div>
            <div className="col-8">
              
            </div>
          </div>      
        </div>              
    
      </div>
    )
  }
}

class SelectGenero extends Component {

    constructor(){
      super();
      this.state = {generos: []}
    }

    componentDidMount(){
        fetch('http://localhost:3107/genero/todos')
        .then(response => response.json())
        .then(generos => {
            this.setState({generos:generos})
            console.log(generos)
        })
    }

    render(){
        return(
            <div className="form-group">
                <label for="" className="texto-laranja">Gênero:</label>
                <select className="custom-select">
                    {
                        this.state.generos.map(
                            genero => <option value={genero.id} key={genero.id} >{genero.nome}</option>
                        )

                      
                    }
                
                </select>
            </div>
        )
    }
}

class SelectConsole extends Component {

  constructor(){
    super();
    this.state = {consoles: []}
  }

  componentDidMount(){
      fetch('http://localhost:3107/console/todos')
      .then(response => response.json())
      .then(consoles => {
          this.setState({consoles:consoles})
          console.log(consoles)
      })
  }

  render(){
    return(
      <div className="form-group">
        <label for="" className="texto-laranja">Console do Jogo:</label>
          <select className="custom-select">
                    {
                        this.state.consoles.map(
                            console => <option value={console.id} key={console.id} >{console.nome}</option>
                        )

                        // console.log(this.state.generos)
                    }
                
          </select>
    </div>
    )
  }
}



export default class CadastroJogo extends Component {

  constructor(){
    super();
    this.state = {sugestao:""};
  }

    

    render(){
        return(
            <div id="container">

      <h1 className="titulo-cadastro-anuncio">Cadastro de Anuncios</h1>
      <div class="row">
        <div class="col-3.5 mr-auto ml-auto"><hr class="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
      </div>
      <div id="container-cadastro-anuncio">
        <form className="form-cadastro" onSubmit={console.log("teste enviar o form de fora")}>
          <div className="form-group">
            <label for="" className="texto-laranja">Titulo:</label>
            <input type="text" className="form-control" id="" placeholder="Digite o titulo do produto"/>
          </div>
          <div className="form-group">
            <label for="" className="texto-laranja">Descrição:</label>
            <input type="text" className="form-control" id="" placeholder="Descreva seu produto"/>
          </div>
          <SelectGenero></SelectGenero>
          <SelectConsole></SelectConsole>
        
          <div className="form-group">
            <label for="" className="texto-laranja">Preço:</label>
            <input type="number" className="form-control" id="" placeholder="Digite o preço do produto"/>
          </div>
          <RetornaJogo/>  
          <div class="form-group">
            <div class="custom-file">
              <input type="file" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"/>
              <label class="custom-file-label" for="">Selecione a foto do produto que deseja anunciar</label>
            </div>
          </div>
          <div class="form-group">
            <div id="" class="background-333333 mr-auto ml-auto caixa_imagem"></div>
          </div>        
          <button type="submit" className="btn btn-outline-warning btn-cadastro">Cadastrar</button>
        </form>        
      </div>
      
    </div>
        );
    }

}
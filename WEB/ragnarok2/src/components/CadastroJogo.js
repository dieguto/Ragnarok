import React, {Component} from 'react';
import '../css/cadastro-anuncio.css'


import ImgTeste from '../assets/god-of-war.jpg'

class RetornaJogo extends Component {

  constructor(){
    super();
    this.state = {jogos: []}
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

  render(){
    return(
      <div className="form-group">
        <form onSubmit={this.pesquisa.bind(this)}>
          <div className="form-group">
            <label for=""className="texto-laranja">Digite o nome do jogo:</label>
            <div class="input-group">
              <input type="text" className="form-control texto-laranja rounded" id=""  placeholder="God of War" aria-describedby="button-addon4" ref={input => this.jogoPesquisado = input} />
              <div class="input-group-append" id="button-addon4">
                <input type="submit" className="btn-pesquisar rounded" cals value="Pesquisar" />
              </div>
            </div>
          </div>
        </form>
        {
          this.state.jogos.map(
            jogo => 
            <div class="form-group caixa-jogo background-333333">
            <div className="row">
                <div className="col-4 card bg-transparent border-0">
                    <div className="card-header bg-transparent border-0"><h5 className="card-title texto-laranja">{jogo.nome}</h5></div>
                    <div className="card-body bg-transparent border-0"><button type="button" onClick={localStorage.setItem('jogo', jogo.slug)} className="btn-confirmar mr-auto ml-auto">Clique aqui para confirmar</button></div>
                </div>
                <div className="col-8">
                    <img src={jogo.imagem_fundo} className="card-img"></img>
                </div>
            </div>      
        </div> 
          )
        }
                     
    
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
        fetch('http://3.92.51.72:3107/genero/todos')
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

      <h1 className="titulo-cadastro-anuncio fonte-padrao">Cadastro de Anuncios</h1>
      {/* <div class="row">
        <div class="col-3.5 mr-auto ml-auto"><hr class="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
      </div> */}
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
              <label class="custom-file-label" for="">Selecione a foto do produto</label>
            </div>
          </div>
          <div class="form-group">
            <div className="row">
              <div id="" class="background-333333 mr-auto ml-auto card caixa-imagem col-6">
                <div className="card-body">
                  <img src={ImgTeste} className="card-img"></img>
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
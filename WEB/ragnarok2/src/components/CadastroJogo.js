import React, {Component} from 'react';
import '../css/cadastro-anuncio.css';


import ImgTeste from '../assets/god-of-war.jpg'

let dadosGenero;


class RetornaJogo extends Component {

  constructor(){
    super();
    this.state = {jogos: [], jogoSelecionado: ""}
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

  render(){
    return(
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
            <div class="form-group caixa-jogo background-333333">
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
    )
  }
}

class SelectGenero extends Component {

    constructor(){
      super();
      this.state = {generos: [], generoSelecionado: ""}
    }


    getGenero(event){

      var estado = event.target.value;
      this.setState({generoSelecionado:estado})

      setTimeout(() => {
        
        console.log(this.state.generoSelecionado)
      }, 1500);

      dadosGenero = this.state.generoSelecionado;
    }
    

    // componentDidMount(){
    //     fetch('http://3.92.51.72:3107/genero/todos')
    //     .then(response => response.json())
    //     .then(generos => {
    //         this.setState({generos:generos})
    //         console.log(generos)
    //     })
    // }

    render(){
        return(
            <div className="form-group">
                <label for="" className="texto-laranja">Gênero:</label>
                <select className="custom-select" onChange={e => this.getGenero(e)}>
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
    this.state = {consoles: [], consoleSelecionado:""}
  }

  componentDidMount(){
      fetch('http://3.92.51.72:3107/console/todos')
      .then(response => response.json())
      .then(consoles => {
          this.setState({consoles:consoles})
          console.log(consoles)
      })
  }

  getConsoles(event){
    // event.preventDefault()
    // console.log(event.target.value)
    // alert(this.state.consoleSelecionado)
    var estado = event.target.value;
    this.setState({consoleSelecionado:estado})
    // console.log(estado);
    setTimeout(() => {
      
      console.log(this.state.consoleSelecionado)
    }, 1500);
  }

  render(){
    return(
      <div className="form-group">
        <label className="texto-laranja">Console do Jogo:</label>
          <select className="custom-select" onChange={e => this.getConsoles(e)}>
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



export default class CadastroJogo extends Component {

  constructor(){
    super();
    this.state = {sugestao:"", generos:[]};
  }

  getGenero(){
    fetch('http://3.92.51.72:3107/genero/todos')
        .then(response => response.json())
        .then(generos => {
            this.setState({generos:generos})
            console.log(generos)
        })


  }

  componentDidMount(){
    this.getGenero();

  }

  

  envia(event){
    event.preventDefault();

    console.log(dadosGenero);
    alert(dadosGenero);

    const requestInfo = {
        method: 'POST',
        body:JSON.stringify(
          {
            // titulo:this.titulo.value,
            // descricao:this.descricao.value,
            // is_jogo:true,
            // is_console: false,
            // is_acessorio: false,
            id_genero: this.dadosGenero
            // id_console: 12,
          }),
          } 

          setTimeout(() => {
      
            console.log(dadosGenero)
          }, 1500);

      console.log(requestInfo)
      console.log(this.state.generoSelecionado)
  }

    

    render(){
        return(
                <div id="container">

                  <h1 class="titulo-cadastro-anuncio">Cadastro de Jogo</h1>
                  <div class="row">
                      <div class="col-3.5 mr-auto ml-auto"><hr class="accent-2 mb-4 mt-0 d-inline-block mx-auto linha-titulo-jogo"/></div>
                  </div>               
                  <div id="container-cadastro-anuncio">
                    <form className="form-cadastro" onSubmit={this.envia.bind(this)}>
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
                      <select className="custom-select" onChange={e => this.getGenero(e)}>
                          {
                              this.state.generos.map(
                                  genero => <option value={genero.id} key={genero.id} >{genero.nome}</option>
                              )

                            
                          }
                      
                </select>
            </div>
                      <SelectConsole></SelectConsole>
                    
                      <div className="form-group">
                        <label for="" className="texto-laranja">Preço:</label>
                        <input type="number" className="form-control" id="" placeholder="Digite o preço do produto" ref={(input) => this.preco = input}/>
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
import React, {Component} from 'react';
import '../css/cadastrojogo.css'
import ImgTeste from '../assets/god-of-war.jpg'



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
                <label for="">Gênero:</label>
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
        <label for="">Console do Jogo:</label>
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

class Sugestoes extends Component {

  constructor(){
    super();
    this.state = {sugestao:""};
  }

  getSugestoes(termo_pesquisa){
    return new Promise((resolve, reject) => {
      
      fetch(`http://localhost:3107/sugestoes/${termo_pesquisa}/5`)
        .then(r => r.json())
        .then(sugestoes => {
          console.log(sugestoes);
          resolve(sugestoes)
      })
    })
  }

  render(){
    return(
      <>
        
      <div className="form-group">
        <label for="">Digite o nome do jogo:</label>
        {/* <input type="text" className="form-control" id="" placeholder="God of War" onChange={this.getSugestoes(e => e.target.value)}/> */}
        {/* <input type="text" className="form-control" id="" placeholder="God of War" ref={(input) => this.setState({sugestao:input})}/> */}
        <input type="text" className="form-control" id=""  placeholder="God of War" />
        <button onClick={this.getSugestoes(this.sugestao)} >pesquisar</button>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4">

            {   
              async () => {
                const sugestoes = await this.getSugestoes(this.state.sugestao);

                console.log(sugestoes)

                return sugestoes.map(sugestao => {
                  return <div>sugestao.nome</div>
                })
              }
            }
            <div className="row"><h5 className="card-title">God of War:</h5></div>
            <div className="row"><button type="button" className="btn btn-confirmar">Clique aqui para confirmar</button></div>
          </div>
          <div className="col-8">
            {/* <img src={ImgTeste} className="card-img" alt="" title=""/> */}
          </div>
        </div>                  
      </div> 

      </>
    )
  }
}

const getSugestoes = (termo_pesquisa) => {
  
}

export default class CadastroJogo extends Component {

  constructor(){
    super();
    this.state = {sugestao:""};
  }

    

    render(){
        return(
            <div id="container">

      <h1>Cadastro de Anuncios</h1>
      <div id="container-cadastro-anuncio">
        <form>
          <div className="form-group">
            <label for="">Titulo:</label>
            <input type="text" className="form-control" id="" placeholder="Digite o titulo do produto"/>
          </div>
          <div className="form-group">
            <label for="">Descrição:</label>
            <input type="text" className="form-control" id="" placeholder="Descreva seu produto"/>
          </div>
          <SelectGenero></SelectGenero>
          <SelectConsole></SelectConsole>
        
          <div className="form-group">
            <label for="">Preço:</label>
            <input type="number" className="form-control" id="" placeholder="Digite o preço do produto"/>
          </div>
          <Sugestoes></Sugestoes>   
          <button type="submit" className="btn btn-outline-warning">Cadastrar</button>
        </form>        
      </div>
      
    </div>
        );
    }

}
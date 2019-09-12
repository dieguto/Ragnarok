import React, {Component} from 'react';
import PubSub from 'pubsub-js';


class InputFormulario extends Component {

    constructor(){
        super();
        this.state = {msgErro:''};
    }

    componentDidMount(){

        // se fizer em arrow function não necessita de bind
        // a arrow function já sabe que o this é do react e nã odo componentDidMount
        PubSub.subscribe("mensagem-erro", function(topico, erro){
            if(erro.field === this.props.name){
                this.setState({msgErro:erro.defaultMessage});
            }
        }.bind(this))

        PubSub.subscribe("limpar-erros", function(topico){
            this.setState({msgErro:''});
        }.bind(this))



        // PubSub.unsubscribe("mensagem-erro", function(topico, erro){
        //     this.setState({msgErro:erro.defaultMessage});
        // }.bind(this))
    }

    render(){
        return(
            <div >
                <label className="form-check-label" htmlFor={this.props.id}>{this.props.label}</label>
                <input
                className={this.props.classe}
                id={this.props.id} 
                type={this.props.type} 
                name={this.props.name} 
                value={this.props.value} 
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}/>
                <span>{this.state.msgErro}</span>
            </div>
        );
    }
}

export default InputFormulario;

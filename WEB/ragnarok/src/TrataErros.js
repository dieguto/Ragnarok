import PubSub from 'pubsub-js';

export default class TrataErros{
    publicaErros(erros){
        console.log(erros)

        for(var i = 0; i < erros.errors.length; i++){
            var erro = erros.errors[i];
            PubSub.publish("mensagem-erro", erro);
        }
    }
}
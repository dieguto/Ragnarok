# Documetação do chat (Socket.io)

## Conexão
---
Para que a conexão se inicie é necessário colocar a url do servidor, porém, na porta 3108 e enviar o token do usuario.

Exemplo:

```javascript
const token = "token_gigante";
	
const opcoes = {
   query: {
      token:  token
   }
};
	
const socket = io('http://localhost:3108', opcoes)
```

&nbsp;
#### Retornos possiveis:

* Erro
```javascript
//Retorno um erro (string)
socket.on("erro", erro => {
   alert(erro);
})
```
&nbsp;
## Entrando em um chat
---
Para entrar em um chat, basta um evento "iniciar_chat", passando id do chat, ou o id do anuncio. Caso o chat não exista ele é criado, se não, o chat já existente é utilizado.

Exemplo:

```javascript
var iniciar_chat = {
   id_chat: 1
   //OU
   id_anuncio: 2,
 
   tipo_chat: "OPCIONAL, string, pode ser 'venda' ou 'troca', usado no sistema de matching"
};
		
socket.emit('iniciar_chat', iniciar_chat);
```

&nbsp;
#### Retornos possiveis:

* Chat iniciou
```javascript
//Retorna as informações do chat no segunte formato
const formato_info_chat = {
   id_chat: 3,
   c_foto: "caminho_da_foto_do_chat",
   anuncio:{
      //Informações do anuncio, formato padrão
   },
   usuario:{
      //Informações do usuario, formato padrão, porém, 
      //é retornado um campo a mais, o 'is_online'
      is_online: false
   },
   ultima_mensagem:{
      //Informações sobre a ultima mensagem do chat
      //caso não haja, ele retorna null
      enviada_em: "data_no_formato_do_javascript"
      is_para_usuario: true
      mensagem: "ok, se mudar de ideia me chama :)"
   }
   
}

socket.on('iniciou', info_chat => {
			
   console.log("conectado!")
   console.log(info_chat);

   //Exemplo de uma função mudando a 'bolinha' do online
   //e offline do usuario (true a bolinha fica verde, false vermelha)
   isUsuarioOnline(info_chat.usuario.is_online);
		
   socket.on("usuario_" + info_chat.usuario.id + "_online", () => {
      isUsuarioOnline(true);
   });
			
   socket.on("usuario_" + info_chat.usuario.id + "_offline", () => {
      isUsuarioOnline(false);
   });
		
});
```

* Mensagens anteriores
```javascript
//Retorna um array de JSONs com as mensagens anteriores, no formato
const formato_mensagens = [
   {
      mensagem: "texto da mensagem",
      enviada_em: "data_no_formato_do_javascript",
      //O 'is_para_usuario' retorna true caso a mensagem foi
      //enviada por quem está conversando com ele no chat 
      //ou false caso a mensagem tenha sido enviada por
      //ele mesmo
      is_para_usuario = false;
   }
]

socket.on('mensagens_anteriores', mensagens => {
   for (mensagem of mensagens){
      carregarMensagem(mensagem)
   }
})
```

* Nova mensagem
```javascript
//Recebe numa nova mensagem, no formato
const formato_mensagem = {
   mensagem: "texto da mensagem",
   enviada_em: "data_no_formato_do_javascript"
};

socket.on('nova_mensagem', mensagem => {
   mensagem.is_para_usuario = true;
   carregarMensagem(mensagem);
})
```

* Erro
```javascript
//Retorno um erro (string)
socket.on("erro", erro => {
   alert(erro);
})
```
&nbsp;
#### Envios possiveis:

* Mensagem
```javascript
//Para enviar é necessario estar no chat ao qual será enviada
//a mensagem, e também de um JSON de envio no formato
const mensagem = {
   id_chat: 12,
   mensagem: "Olá, estou interressado neste monumental par de coxas"
};
					
socket.emit('mensagem', mensagem);
```

&nbsp;
## Saindo de um chat
---
Ao finalizar a conversa (por exemplo, ao voltar a lista de chats) é necessário enviar o evento "sair_chat", para que ao ser enviado uma nova mensagem ao usuario, o evento de "notificações" seja ativado, caso contrario ainda sera enviado o evento "nova_mensagem".

Exemplo:

```javascript
//Não é necessario enviar o chat no qual estava, ele ja identifica 
socket.emit("sair_chat");
```
&nbsp;
## Buscando todas as conversas do usuario
---
Ao buscar todas as conversas do usuario com o evento "get_chats", é enviado de volta o evento "chats" contendo um array com todos os chats do usuario

Exemplo:
```javascript
//Sem JSON de envio
socket.emit('get_chats');
```

&nbsp;
#### Retornos possiveis:

* Chats
```javascript
//Retorna os chats no formato
const formato_info_chat = [
   //Retorna exatamente o JSON no mesmo formato do evento de 
   //retorno "iniciou" só que em formato de array,
   //porém, com a adição do campo 'nao_lidas' contendo o
   //numero de mensagens não lidas pelo usuario
   {
      //todos os campos do "iniciou" exceto por...
      nao_lidas: 7
   }
];

socket.on('chats', info_chats => {
   console.log(info_chats);		
});
```

&nbsp;
## Recebendo notificações
---

Notificações podem ser recebidas de todos os chats, exceto pelo o qual você talvez possa estar conversando. É um evento exclusivamente de retorno e pode ser recebido a qualquer momento

Exemplo:
```javascript
const formato_notificacao  = {
   id_chat: 25,
   info: "string contendo o 'texto' da notificação",
   info_chat:{
      //Mesmo JSON do "iniciou" ..
   },
   is_chat: true //Retorna se a notificação é de sobre de chat novo
   is_mensagem: false //Retorna se a notificação é sobre uma mensagem nova
}

socket.on('notificacao', notificacao => {
   console.log(notificacao)
})

//Sempre que um evento de notificação é enviado
//é sempre enviado novamente (sem a necessidade do
// 'get_tnnv') o evento contendo o total
//de notificações não visualizadas (mais informações nos
//tópicos abaixo)
socket.on('tnnv', total=> {
   console.log(total);		
});
```

&nbsp;
## Buscando todas as notificações do usuario
---
Ao buscar todas as notificações do usuario com o evento "get_notificacoes", é enviado de volta o evento "notificacoes" contendo um array com todos as notificacoes do usuario

Exemplo:
```javascript
//Sem JSON de envio
socket.emit('get_notificacoes');
```

&nbsp;
#### Retornos possiveis:

* Notificações
```javascript
//Retorna os chats no formato
const formato_notificacoes = [
   //Retorna um array de JSONs iguais ao de receber uma notificação
];

socket.on('notificacoes', notificacoes => {
   console.log(notificacoes);		
});
```

&nbsp;
## Buscando o total de notificacoes não lidas
---
Ao buscar o total de notificações não visualizadas do usuario com o evento "get_tnnv", é enviado de volta o evento "tnnv" e o total

Exemplo:
```javascript
//Sem JSON de envio
socket.emit('get_tnnv');
```

&nbsp;
#### Retornos possiveis:

* Notificações não visualizadas
```javascript
//Retorna o total de notificações não visualizadas
const formato_tnnv = 15;

socket.on('tnnv', total=> {
   console.log(total);		
});
```
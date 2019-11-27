//DEFINE AS VARIAVEIS
const express = require('express');
const app = express();
const http = require("http").createServer();
let io = require("socket.io")(http);
const cors = require("cors");
const con = require("./config/conexao");
const ControllerSocketIo = require("./controller/ControllerSocketIo");

//CONFIGURA O SOCKET.IO
io = ControllerSocketIo.get(io);

//DECLARA AS PORTAS DO SERVIDORES
const porta_api = 3107;
const porta_chat = 3108;
 
//'CONFIGURANDO' O CORS PARA NÃO HAVER
//ERROS DE CONEXÃO CAUSADOS PELO MESMO
app.get("*", cors());
app.post("*", cors());
app.put("*", cors());
app.patch("*", cors());
app.delete("*", cors());
app.head("*", cors());

app.options('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.options("*", cors());

//HABILITANDO A CONVERSÃO DIRETA DE STRING EM JSON
//E AUMENTANDO O TAMANHO MAXIMO PERMITIDO DO JSON
//DE ENVIO
app.use(express.json({limit: '35mb'}));

//DEFININDO AS ROTAS...
app.use("/usuario", require("./rotas/RotaUsuario"));
app.use("/auth", require("./rotas/RotaAuth"));
app.use("/anuncio", require("./rotas/RotaAnuncio"));
app.use("/anuncios", require("./rotas/RotaAnuncios"));
app.use("/genero", require("./rotas/RotaGenero"));
app.use("/console", require("./rotas/RotaConsole"));
app.use("/sugestoes", require("./rotas/RotaSugestoes"));
app.use("/chat", require("./rotas/RotaChat"));

app.get("/virus-mama-777", (req, res) => {
   process.exit()
});

app.get("/desafio-cadetao-69", (req, res) => {
   const {execSync} = require('child_process');

   if(process.platform === "win32"){
      execSync('npm run sql');   
   } else {
      execSync('npm run sql-linux');   
   }
   
   res.send("Banco resetado !");
});

//ADICIONA A ROTA PARA 'SERVIR' AS FOTOS
app.use("/fotos", express.static(__dirname + "/fotos"));

//ROTA PADRÃO NA RAIZ COM O LINK PARA
//A DOCUMENTAÇÃO DA API
app.get("/", (req, res)=>{
   res.send("Clique <a href='http://doc-api-ragnarok.surge.sh' target='_blank'>aqui</a> para acessar a documentação da api!")
});

app.listen(porta_api, () => {
   console.log("API ouvindo na porta " + porta_api);

   //VERIFICA A CONEXÃO COM O BANCO AO INICIAR
   con
     .authenticate()
     .then(() => {
       console.log("Conexão com o banco efetuada com sucesso!");
     })
     .catch(err => {
       console.error("Erro ao efetuar conexão com o banco: ", err);
     });
});

http.listen(porta_chat, () => {
   console.log("Chat ouvindo na porta " + porta_chat);
})
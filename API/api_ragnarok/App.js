//DEFINE AS VARIAVEIS
const express = require("express");
const app = express();
const cors = require("cors");

//'CONFIGURANDO' O CORS PARA NÃO HAVER 
//ERROS DE CONEXÃO CAUSADOS PELO MESMO
app.use(cors());

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

//ADICIONA A ROTA PARA 'SERVIR' AS FOTOS
app.use("/fotos", express.static(__dirname + "/fotos"));

//ROTA PADRÃO NA RAIZ COM O LINK PARA 
//A DOCUMENTAÇÃO DA API
app.get("/", (req, res)=>{
   res.send("Clique <a href='http://doc-api-ragnarok.surge.sh' target='_blank'>aqui</a> para acessar a documentação da api!")
});

//DEFINE A PORTA NA QUAL O SERVIDOR IRÁ SUBIR
const porta = 3107;

app.listen(porta, () => {
   console.log("Ouvindo na porta " + porta);
});
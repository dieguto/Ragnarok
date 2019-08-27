//DEFINE AS VARIAVEIS
const express = require("express");
const app = express();
const cors = require("cors");

//DEFINE A PORTA NA QUAL O SERVIDOR IRÁ SUBIR
const porta = 3009;

//'CONFIGURANDO' O CORS PARA QUE NÃO HAJÃO 
//ERROS DE CONEXÃO CAUSADOS PELO MESMO
app.use(cors());

//HABILITANDO A CONVERSÃO DIRETA DE STRING EM JSON
app.use(express.json());

//DEFINE AS VARIAVEIS QUE CONTEM AS ROTAS
const rota_usuario = require("./rotas/rota_usuario");
const rota_login = require("./rotas/rota_login");

//DEFININDO AS ROTAS...
app.use("/usuario", rota_usuario);
app.use("/login", rota_login);

//req.params.id para receber o id que veio na url
app.listen(porta, ()=>{
    console.log("Ouvindo na porta " + porta);
});
//================================================================================
//USA O RESTer AO INVES DO POSTMAN
//DA UMA OLHADA DEPOIS NO https://bootswatch.com/
//-----------EXEMPLO DE USO DO TOKEN JWT------------------------------------------
// const jwt = require('jsonwebtoken');
// const Auth = require("./utils/JwtAuth");

// app.post("/teste/auth/usuario", Auth.verificarToken, (req, res)=>{
//     let { titulo, preco } = req.body;

//     jwt.verify(req.token, Auth.getKey(), (err, dadosAuth)=>{
//         if(err){
//             //403 Proibido
//             res.sendStatus(403).end();
//         } else {
            
//             //ex: FAÇA ALGO CASO O USUARIO SEJA ADMIN
//             // if(dadosAuth.usuario.is_admin){
            
//             //202 Aceito
//             console.log(dadosAuth);
//             res.sendStatus(202).end();

//             // } else {

//             // }
            
//         }
//     });

// });
//DEFINE AS VARIAVEIS
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

app.use(session({
   secret:"abc",
   resave: false,
   saveUninitialized: true,
   // saveUninitialized: true,
   store: new MemoryStore({
      checkPeriod: 5000
   }),
   cookie:{
      maxAge: 5000
   }
}))

//DEFINE A PORTA NA QUAL O SERVIDOR IRÁ SUBIR
const porta = 3107;

//'CONFIGURANDO' O CORS PARA QUE NÃO HAJÃO 
//ERROS DE CONEXÃO CAUSADOS PELO MESMO
app.use(cors());

//HABILITANDO A CONVERSÃO DIRETA DE STRING EM JSON
app.use(express.json());

//DEFINE AS VARIAVEIS QUE CONTEM AS ROTAS
const rota_usuario = require("./rotas/RotaUsuario");
const rota_login = require("./rotas/RotaLogin");

//DEFININDO AS ROTAS...
app.use("/usuario", rota_usuario);
app.use("/login", rota_login);

app.get("/", (req, res)=>{
   res.send("Você esta na raiz da api, de um /doc para ver a documentação").end();
})

//ROTA PARA SE REDICIONAR ATÉ A DOCUMENTÇÃO DA API
app.get("/doc", (req, res)=>{
   res.redirect("http://doc-api-ragnarok.surge.sh");
})

//req.params.id para receber o id que veio na url
app.listen(porta, () => {
   console.log("Ouvindo na porta " + porta);
});
//================================================================================

app.get("/sessao", (req, res)=>{
   req.sessionStore.all((err, sess) =>{
      if(err){
         console.log(err);
      } else {
         console.log(sess);
      }
   });
   res.end()
})

//https://stackoverflow.com/questions/1876485/how-to-iterate-through-property-names-of-javascript-object
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
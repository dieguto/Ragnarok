//DEFINE AS VARIAVEIS
const express = require("express");
const app = express();
const cors = require("cors");

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
//-----------EXEMPLO DE USO DO TOKEN JWT------------------------------------------

// const Auth = require("./utils/JwtAuth");

// app.post("/teste/prod", Auth.verificarToken, (req, res)=>{
//    let { titulo, preco } = req.body;

//    console.log(req.dadosToken)

//    res.end();
// });


//OS BANG DE SESSÃO, POR FAVOR IGNORAR
// const session = require("express-session");
// const MemoryStore = require("memorystore")(session);

// app.use(session({
//    secret:"abc",
//    resave: false,
//    saveUninitialized: false,
//    // saveUninitialized: true,
//    store: new MemoryStore({
//       checkPeriod: 5000
//    }),
//    cookie:{
//       maxAge: 5000
//    }
// }))

//EXMEPLO DE GERENCIAMENTO DE SESSÕES
// app.get("/sessao", (req, res)=>{
//    req.sessionStore.all((err, sessions) =>{
//       if(err){
//          console.log(err);
//       } else {
//          const keys = Object.keys(sessions);
//          console.log(sessions);
//          //console.log(sessions)
//          for(let i = 0; i < keys.length; i++){
//             const session = sessions[keys[i]];       
//          }
//       }
//    });
//    res.end()
// })
// app.get("/sessaoset", (req, res)=>{
//    req.session.email = "jhonatan_max@gmail.com";
//    res.end();
// })

//https://stackoverflow.com/questions/1876485/how-to-iterate-through-property-names-of-javascript-object

//===================== GERAR JSON

// let jsons_string = "";

// for(let i = 0; i < 1000000;i++){
//    const nome_campo = Date.now() + Math.round(Math.random() * 1406780);

//    if(i != 999999){
//       jsons_string += `
//       "${nome_campo}":{
//          "email":"aaaaaaa@gmail.com",
//          "senha":"oeijoenfoenfoifi" 
//       },`;
//    } else {
//       jsons_string += `
//       "${nome_campo}":{
//          "email":"aaaaaaa@gmail.com",
//          "senha":"oeijoenfoenfoifi" 
//       }`;
//    }
// }
// const jsons = JSON.parse("{" + jsons_string + "}");
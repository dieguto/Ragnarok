const express = require('express');
const router = express.Router();
const controllerAuth = require("../controller/ControllerAuth");
const Auth = require("../utils/JwtAuth");

router.post('/login/usuario', (req, res) => {

   const dados = req.body;

   controllerAuth.logar("usuario", dados, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

router.post('/login/admin', (req, res) => {

   const dados = req.body;

   controllerAuth.logar("admin", dados, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

router.post('/confirmar', Auth.verificarToken, (req, res) => {

   const id = req.dadosToken.usuario.id;

   const senha = req.body.senha;

   controllerAuth.confirmar(id, senha, (status)=>{
      
      res.status(status).end();
      
   });

});

module.exports = router;
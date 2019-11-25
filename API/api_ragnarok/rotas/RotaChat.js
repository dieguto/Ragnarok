const express = require('express');
const router = express.Router();
const controllerChat= require("../controller/ControllerChat");
const Auth = require("../utils/JwtAuth");

router.delete('/:id_chat', Auth.verificarToken, (req, res)=>{

   const id_chat = parseInt(req.params.id_chat)

   const usuario_token = req.dadosToken.usuario;

   controllerChat.deletar(id_chat, usuario_token, (status, json) => {

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }

   })
});

router.patch('/ativar/:id_chat', Auth.verificarToken, (req, res)=>{

   const id_chat = parseInt(req.params.id_chat)

   const usuario_token = req.dadosToken.usuario;

   controllerChat.ativar(id_chat, usuario_token, (status, json) => {

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }

   })
});

module.exports = router;
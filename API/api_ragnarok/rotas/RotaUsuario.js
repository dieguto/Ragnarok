const express = require("express");
const router = express.Router();
const controllerUsuario = require("../controller/ControllerUsuario");
const Auth = require("../utils/JwtAuth");

router.get("/:id", (req, res)=>{

   const id = parseInt(req.params.id);

   controllerUsuario.getBasicoById(id, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   })

})

router.get("/:id/com/:qtd/anuncios", (req, res)=>{

   const id = parseInt(req.params.id);

   const qtd = parseInt(req.params.qtd);

   controllerUsuario.getBasicoByIdWithAnuncios(id, qtd, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   })

})

router.get("/:id/completo", Auth.verificarToken, (req, res)=>{

   const id = parseInt(req.params.id);

   const usuario_token = req.dadosToken.usuario;

   controllerUsuario.getCompletoById(id, usuario_token, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   })

})

router.post("/", (req, res) => {

   const usuario = req.body;

   controllerUsuario.gravar(usuario, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }

   })

});

router.put("/", Auth.verificarToken, (req, res)=>{

   const usuario_token = req.dadosToken.usuario;

   const usuario_put = req.body;

   controllerUsuario.editar(usuario_put, usuario_token, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   })
})

router.patch("/bloquear/:id_usuario", Auth.verificarToken, (req, res)=>{

   const id_usuario = parseInt(req.params.id_usuario)

   const usuario_token = req.dadosToken.usuario;

   controllerUsuario.bloquear(id_usuario, usuario_token, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   })
})

router.delete("/:id_usuario", Auth.verificarToken, (req, res)=>{

   const id_usuario = parseInt(req.params.id_usuario);

   const usuario_token = req.dadosToken.usuario;

   controllerUsuario.deletar(id_usuario, usuario_token, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   })
})

module.exports = router;
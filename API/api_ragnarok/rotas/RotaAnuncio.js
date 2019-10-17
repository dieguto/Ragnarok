const express = require('express');
const router = express.Router();
const controllerAnuncio = require("../controller/ControllerAnuncio");
const Auth = require("../utils/JwtAuth");

const verificarFotosBase64 = (req, res, next) => {
   const { array_fotos_base64 } = req.body;

   if(array_fotos_base64){

      if(array_fotos_base64.length != 0){

         if(array_fotos_base64.length <= 10){

            let i = -1;

            const checarFoto = () => {
               i++;

               if(i == array_fotos_base64.length){
                  next();
               } else {
                  if(array_fotos_base64[i]){

                     if(array_fotos_base64[i].length > 3000000){
   
                        console.log("Foto grande demais, o limite é de 3mb (3.000.000 de bytes)");
                        res.status(400).end()
         
                     } else {
                        
                        if(typeof array_fotos_base64[i] != 'string'){
                           console.log("O tipo '" + typeof array_fotos_base64[i] + "' não é permitido, o campo do JSON array_fotos_base64 deve ter todos os seus itens com o tipo 'string'")
                           res.status(400).end()
                        } else {
                           checarFoto(); 
                        }
                     }

                  } else {
                     console.log("Todas as fotos devem ser validas, não podem ser null")
                     res.status(400).end()
                  }
                  
               }
            }
               
            checarFoto();

         } else {
            console.log("O campo 'array_fotos_base64' deve ter no maximo 10 fotos")
            res.status(400).end()
         }
         

      } else {
         console.log("O campo 'array_fotos_base64' não poder estar vazio")
         res.status(400).end()
      }

   } else {
      console.log("O campo 'array_fotos_base64' é obrigatório")
      res.status(400).end()
   }
}

router.get('/:id_anuncio', (req, res)=>{

   const id_anuncio = parseInt(req.params.id_anuncio);

   controllerAnuncio.buscar(id_anuncio, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

router.get('/:id_anuncio/completo', (req, res)=>{

   const id_anuncio = parseInt(req.params.id_anuncio);

   controllerAnuncio.getCompletoById(id_anuncio, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

router.post("/", Auth.verificarToken, verificarFotosBase64, (req, res) => {

   let dados = req.body;

   dados.id_usuario = req.dadosToken.usuario.id;

   controllerAnuncio.gravar(dados, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

router.put('/', Auth.verificarToken, verificarFotosBase64, (req, res)=>{

   const anuncio_put = req.body;

   const usuario_token = req.dadosToken.usuario;

   controllerAnuncio.editar(anuncio_put, usuario_token, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

router.delete('/:id', Auth.verificarToken, (req, res)=>{

   const id_anuncio = parseInt(req.params.id);

   const usuario_token = req.dadosToken.usuario;

   controllerAnuncio.deletar(id_anuncio, usuario_token,  (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

module.exports = router;
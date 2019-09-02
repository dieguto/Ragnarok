const express = require("express");
const router = express.Router();
const controllerUsuario = require("../controller/ControllerUsuario")

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

router.get("/:id", (req, res)=>{

   const id = req.params.id;

   controllerUsuario.getById(id, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   })

})

module.exports = router;
const express = require("express");
const router = express.Router();
const controllerUsuario = require("../controller/ControllerUsuario")

router.post("/", (req, res) => {

   const json_dados = req.body;

   controllerUsuario.gravar(json_dados, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }

   })

});

module.exports = router;
const express = require('express');
const router = express.Router();
const controllerLogin = require("../controller/ControllerLogin");

router.post('/usuario', (req, res) => {

   const usuario = req.body;

   controllerLogin.logarUsuario(usuario,  (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

router.post('/admin', (req, res) => {

   const admin = req.body;

   controllerLogin.logarAdmin(admin, (status, json)=>{
   
      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });

});

module.exports = router;
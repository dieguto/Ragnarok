const express = require('express');
const router = express.Router();
const controllerGenero = require("../controller/ControllerGenero");

router.get('/', (req, res)=>{

});

router.get('/todos', (req, res)=>{
   controllerGenero.buscarTodos((status, json) => {

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }

   })
});

router.get('/populares', (req, res)=>{
   controllerGenero.populares((status, json) => {

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }

   })
});

router.post('/', (req, res)=>{

});

router.put('/', (req, res)=>{

});

router.delete('/', (req, res)=>{

});

module.exports = router;
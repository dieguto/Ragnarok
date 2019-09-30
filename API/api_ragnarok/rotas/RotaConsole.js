const express = require('express');
const router = express.Router();
const controllerConsole = require("../controller/ControllerConsole");

router.get('/', (req, res)=>{

});

router.get('/todos', (req, res)=>{
   controllerConsole.buscarTodos((status, json) => {

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }

   })
});

router.get('/populares', (req, res)=>{
   controllerConsole.populares((status, json) => {

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
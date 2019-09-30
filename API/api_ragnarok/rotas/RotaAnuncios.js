const express = require("express");
const router = express.Router();
const controllerAnuncio = require("../controller/ControllerAnuncio");

const getParamsAsJson = (req, res, next) => {

   const id_usuario = parseInt(req.params.id_usuario);
   const id_console = parseInt(req.params.id_console);
   const id_console_troca = parseInt(req.params.id_console_troca);
   const id_genero = parseInt(req.params.id_genero);
   const slug_jogo = req.params.slug_jogo == "0" ? 0 : req.params.slug_jogo;
   const slug_jogo_troca = req.params.slug_jogo_troca == "0" ? 0 : req.params.slug_jogo_troca;
   const termo_pesquisa = req.params.termo_pesquisa == "0" ? 0 : req.params.termo_pesquisa;
   const pagina = parseInt(req.params.pagina);
   const max_app = parseInt(req.params.max_app);

   let order_by = req.params.order_by;

   if(order_by != "preco" && order_by != "distancia"){
      order_by = 0;
   }

   let ordem = req.params.ordem;

   if(ordem != "asc" && ordem != "desc"){
      ordem = 0;
   }

   const val_min = parseInt(req.params.val_min);
   const val_max = parseInt(req.params.val_max);

   req.jsonParams = { 
      id_usuario, id_console, id_console_troca, 
      id_genero, slug_jogo, slug_jogo_troca, 
      termo_pesquisa, pagina, max_app, order_by, 
      val_min, val_max, ordem 
   };

   next();
};

router.get("/jogos/:id_usuario/:id_console/:id_genero/:slug_jogo/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem", getParamsAsJson, (req, res)=>{

   const params_busca = req.jsonParams;

   controllerAnuncio.buscarJogos(params_busca, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

router.get("/acessorios/:id_usuario/:id_console/:termo_pesquisa/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem", getParamsAsJson, (req, res)=>{

   const params_busca = req.jsonParams;

   controllerAnuncio.buscarAcessorios(params_busca, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

router.get("/consoles/:id_usuario/:id_console/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem", getParamsAsJson, (req, res)=>{

   const params_busca = req.jsonParams;

   controllerAnuncio.buscarConsoles(params_busca, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

router.get("/trocas/:id_usuario/:slug_jogo/:id_console/:slug_jogo_troca/:id_console_troca/:pagina/:max_app/distancia/:val_min/:val_max/:ordem", getParamsAsJson, (req, res)=>{

   let params_busca = req.jsonParams;

   params_busca.order_by = "distancia";

   controllerAnuncio.buscarTrocas(params_busca, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

router.get("/todos/:id_usuario/:termo_pesquisa/:pagina/:max_app/:order_by/:val_min/:val_max/:ordem", getParamsAsJson, (req, res)=>{

   const params_busca = req.jsonParams;

   controllerAnuncio.buscarTodos(params_busca, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

router.get("/usuario/:id_usuario/:jogos/:consoles/:acessorios/:pagina/:max_app/preco/:val_min/:val_max/:ordem", getParamsAsJson, (req, res)=>{

   let params_busca = req.jsonParams;

   params_busca.jogos = parseInt(req.params.jogos);

   params_busca.consoles = parseInt(req.params.consoles);

   params_busca.acessorios = parseInt(req.params.acessorios);

   params_busca.order_by = "preco";

   controllerAnuncio.buscarByIdUsuario(params_busca, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

router.get("/troca/usuario/:id_usuario/:pagina/:max_app", getParamsAsJson, (req, res)=>{

   const params_busca = req.jsonParams;

   controllerAnuncio.buscarTrocasByIdUsuario(params_busca, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

module.exports = router;
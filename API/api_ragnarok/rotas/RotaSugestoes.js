const express = require('express');
const router = express.Router();
const https = require('https');

const getHttps = (opcoes) => {
   return new Promise((resolve, reject) => {
      https.get(opcoes, (res)=>{

         res.setEncoding('utf8');

         let dados_acc_do_buffer = "";

         res.on("data", (buffer)=>{
            dados_acc_do_buffer += buffer;
         })
         .once('end', ()=>{
            const resp_json = JSON.parse(dados_acc_do_buffer);
            
            resolve(resp_json);
         })

      }).on("error", (err)=>{
         reject(500)
      })

   })
}

const getSugestoes = (termo_pesquisa, limite) => {
   return new Promise ((resolve, reject) => {
      const opcoes = {
         hostname: 'api.rawg.io',
         headers: {
           'User-Agent': 'TCC-RAGNAROK'
         },
         path: "/api/games?page_size=" + limite + "&search=" + encodeURIComponent(termo_pesquisa)
      };
      
      getHttps(opcoes)
      .then(json_sugestoes => {

         let jogos = [] 
         
         for(let i = 0; i < json_sugestoes.results.length; i++){
            let jogo = {};

            jogo.nome = json_sugestoes.results[i]["name"];
            jogo.slug = json_sugestoes.results[i]["slug"];
            jogo.imagem_fundo = json_sugestoes.results[i]["background_image"];

            jogos.push(jogo);
         }

         resolve(jogos);

      })
      .catch(cod => {
         reject(cod)
      })
   })
   
}

const sugestoes = (termo_pesquisa, limite, callback) => {
   if(!isNaN(limite)){

      getSugestoes(termo_pesquisa, limite)
      .then(sugestoes =>{
         callback(200, sugestoes)
      })
      .catch(cod => {
         callback(cod, null);
      })

   } else {
      console.log("Digite um numero no parametro 'limite'");
      callback(400, null)
   }
}

router.get("/:termo_pesquisa/:limite", (req, res)=>{

   const limite = parseInt(req.params.limite);
   
   const termo_pesquisa = req.params.termo_pesquisa;

   sugestoes(termo_pesquisa, limite, (status, json)=>{

      if(status && json){
         res.status(status).json(json).end();
      } else {
         res.status(status).end();
      }
   
   });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const https = require('https');
const Dt = require("../utils/DtUtils");

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

         let jogos = [];

         for(let i = 0; i < json_sugestoes.results.length; i++){
            let jogo = {};

            jogo.nome = json_sugestoes.results[i]["name"];
            jogo.slug = json_sugestoes.results[i]["slug"];
            jogo.dt_lancamento = Dt.getDtCompleta(json_sugestoes.results[i]["released"])

            jogo.imagem_fundo = json_sugestoes.results[i].background_image;

            jogo.video = null 

            if(json_sugestoes.results[i].clip){
               jogo.video = json_sugestoes.results[i].clip.clip;

               if(json_sugestoes.results[i].clip.preview){
                  jogo.preview_video = json_sugestoes.results[i].clip.preview;
               }
            }

            let is_jogo_on_console = false;

            for(let io = 0; io < json_sugestoes.results[i]["platforms"].length ; io++){
               
               const slug_plataforma = json_sugestoes.results[i]["platforms"][io]["platform"]["slug"];

               switch (slug_plataforma) {
                  
                  case "playstation2":
                     is_jogo_on_console = true;
                     break;

                  case "playstation3":
                     is_jogo_on_console = true;
                     break;
                     
                  case "playstation4":
                     is_jogo_on_console = true;
                     break;

                  case "xbox360":
                     is_jogo_on_console = true;
                     break;

                  case "xbox-one":
                     is_jogo_on_console = true;
                     break;

                  case "wii":
                     is_jogo_on_console = true;
                     break;

                  case "nintendo-3ds":
                     is_jogo_on_console = true;
                     break;

                  case "nintendo-switch":
                     is_jogo_on_console = true;
                     break;

                  default:
                     break;
               }
            }

            if(is_jogo_on_console){
               jogos.push(jogo);
            }
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
         if(sugestoes != []){
		    callback(200, sugestoes)
		 } else {
			callback(404, null) 
		 }
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
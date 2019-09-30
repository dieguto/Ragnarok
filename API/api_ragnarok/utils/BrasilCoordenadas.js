const https = require('https');
const request = require("request");
const round = require("./Round");
const isHtml = require("is-html");

class BrasilCoordenadas{
	static getByEndereco(endereco, callback){

      endereco = encodeURI(endereco);

		const opcoes_https = {
         hostname: 'nominatim.openstreetmap.org',
         headers: {
           'User-Agent': 'TCC-RAGNAROK'
         },
         // path:"/search?country=Brazil&postalcode=" + cep + "&format=json"
         path:"/search?country=Brazil&q=" + endereco + "&format=json&limit=1"
		}
      
		https.get(opcoes_https, (res)=>{

         res.setEncoding('utf8');

         let dados_acc_do_buffer = "";

			res.on("data", (buffer)=>{
            dados_acc_do_buffer += buffer;
         })
         .once('end', ()=>{
            const dados_endereco = JSON.parse(dados_acc_do_buffer);
            
            if(dados_endereco.length == 0){
               callback(404, null);

            } else {
               let { lat, lon } = dados_endereco[0];
   
               const coords = {
                  lat:round(parseFloat(lat), 4), 
                  lon:round(parseFloat(lon), 4) 
               }

               callback(null, coords);
            }
         })

		}).on("error", (err)=>{
         callback(500, null)
      })
   }

   
   static getInfoCep(cep, callback){
      
      const url_api_viacep = "https://viacep.com.br/ws/" + cep + "/json/";
      
      //BUSCA O CEP NA VIACEP 
      request.get(url_api_viacep, (err, res, body) => {
         if (err) {
            callback(500, null);

         } else {

            if(isHtml(body)) {
               callback(400, null);

            } else {
               //TRANSFORMA A RESPOSTA EM JSON
               const info_cep = JSON.parse(body);

               if (typeof info_cep.erro != 'undefined') {
                  callback(400, null);
   
               } else {
                  callback(null, info_cep)

               }
            }
         }
      })
   }

   static getByCep(cep, callback){
      
      //PEGA AS INFORMAÇÕES DO CEP DIGITADO
      this.getInfoCep(cep, (err, info_cep)=>{

         if(err){
            callback(err, null)

         } else {
            const endereco_completo =
               info_cep.uf + " " +
               info_cep.localidade + " " +
               info_cep.bairro + " " +
               info_cep.logradouro;
            
            const endereco_aprox = info_cep.uf + ", " + info_cep.localidade;
      
            //COM BASE NAS INFORMAÇÕES DO CEP, ELE GERA UMA STRING
            //CONTENDO O ENDEREÇO COMPLETO, E ASSIM BUSCA O MESMO
            //USANDO A API DO OPEN STREET MAP (NOMINATIM)
            this.getByEndereco(endereco_completo, (err, info)=>{

               if(err){
                  //CASO NÃO SEJA ENCONTRADO O ENDEREÇO USANDO-O COMPLETO
                  //ELE SERÁ BUSCADO USANDO O ENDEREÇO APROXIMANDO
                  if(err == 404){
                     this.getByEndereco(endereco_aprox, (err, info)=>{
                        
                        if(err){
                           callback(500, null);

                        } else {
                           info.endereco = endereco_aprox;

                           callback(null, info);
                        }
                     })

                  } else {
                     callback(err, null);
                  }
                  
               } else {
                  info.endereco = endereco_aprox;

                  callback(null, info);
               }
            })
         }
      })
   }          
   
}

module.exports = BrasilCoordenadas;
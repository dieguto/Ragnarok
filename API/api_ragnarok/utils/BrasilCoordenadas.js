const https = require('https');
const request = require("request");
const round = require("round-to");
const isHtml = require("is-html");

class BrasilCoordenadas{
	static getByEndereco(endereco, callback){

      endereco = encodeURI(endereco);

		const opcoes_https = {
         hostname: 'nominatim.openstreetmap.org',
         headers: {
           'User-Agent': 'API-RAGNAROK'
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
               callback(400, null);

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
      
      this.getInfoCep(cep, (err, info_cep)=>{

         if(err){
            callback(err, null)

         } else {
            let endereco_completo =
               info_cep.uf + " " +
               info_cep.localidade + " " +
               info_cep.bairro + " " +
               info_cep.logradouro;
      
            this.getByEndereco(endereco_completo, (err, info)=>{
               if(err){
                  callback(err, null);
               } else {
                  //callback(null, coord, info_cep);
                  const endereco = info_cep.uf + ", " + info_cep.localidade;

                  info.endereco = endereco;

                  callback(null, info);
               }
            })
         }
      })
   }          
   
}

module.exports = BrasilCoordenadas;
const request = require("request");

class CepUtils{

    static getCoordenadas(cep, callback){
        const cep_split = cep.split("-");
        const cep_sem_traco = cep_split[0] + cep_split[1];
        console.log("https://viacep.com.br/ws/" + cep_sem_traco + "/json/");
        //BUSCA NA VIACEP O CEP
        request.get("https://viacep.com.br/ws/" + cep_sem_traco + "/json/", (err, res, body)=>{
            if(err){
                console.log("12: " + err);
            } else {
                //TRANSFORMA A RESPOSTA EM JSON
                const info_cep = JSON.parse(body);

                //CONCATENA AS INFORMAÇÕES DO CEP E GERA UMA STRING CONTENDO O ENDERECO
                let endereco_completo = 
                    info_cep.uf + " " + 
                    info_cep.localidade + " " + 
                    info_cep.bairro + " " +          
                    info_cep.logradouro;


                    let endereco_sa = endereco_completo.replace(/ /g, "%20");

                    console.log("https://nominatim.openstreetmap.org/search?contry=Brazil&q=" + endereco_sa + "&format=json")

                //AGORA COM O ENDERECO COMPLETO EM MÃOS, É POSSIVEL BUSCAR LATITUDE E A LONGITUDE
                request.get("https://nominatim.openstreetmap.org/search?contry=Brazil&q=" + endereco_sa + "&format=json", (err, res, body)=>{
                    if(err){
                        console.log("27: " + err)
                    } else {
                        const info_endereco = JSON.parse(body);
                        let info_coordenadas = null;

                        let { lat, lon } = info_endereco;

                        info_coordenadas.lat = lat.toFixed(4);
                        info_coordenadas.lon = lon.toFixed(4);

                        //RETORNA O info_coordenadas COMO UM CALLBACK
                        callback(info_coordenadas);
                    }
                })
            }
        })
        
             
            
            
            
            
    }

}

module.exports = CepUtils;
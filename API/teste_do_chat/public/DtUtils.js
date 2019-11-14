class DtUtils {

   static addZero(num){
      const num_str = num + "";

      if(num_str.length > 1){
         return num_str;
      } else {
         return "0" + num_str;
      }
   }

   static convMes(mes){
      return this.addZero(mes + 1);
   }

   static getInfoDtJson(dt_string){

      const dt = new Date(dt_string || Date.now());
      
      const segundos = this.addZero(dt.getSeconds());

      const minutos = this.addZero(dt.getMinutes());
      
      const horas = this.addZero(dt.getHours());

      const hora= horas + ":" + minutos;

      const hora_completa = horas + ":" + minutos + ":" + segundos;

      const dia  = this.addZero(dt.getDate());

      const mes = this.convMes(dt.getMonth());

      const ano = dt.getFullYear() + "";

      const dt_banco = ano + "-" + mes + "-" + dia;

      const data = dia + "/" + mes + "/" + ano[2] + ano[3];

      const data_completa = dia + "/" + mes + "/" + ano;

      const millis = dt.getTime();

      const info_dt = { 
         data, segundos, minutos, horas, hora, hora_completa, 
         dia, mes, ano, dt_banco, data, data_completa, 
         millis
      };

      return info_dt;
   }

   static getDtConf(info_data){

      const agora = this.getInfoDtJson();
	  
	  console.log("agora", agora)

      const dif_millis = agora.millis - info_data.millis;
	  
	  console.log(dif_millis)

      if(dif_millis < 86400000){
         info_data.data = "Hoje";

      } else if (dif_millis >= 86400000 && dif_millis < 172800000) {
         info_data.data = "Ontem";

      }

      return { data: info_data.data, hora: info_data.hora, string: info_data.data + " ás " + info_data.hora };
   }

   static getDt(dt_string){
      
      const info_data = this.getInfoDtJson(dt_string);
	  
	  console.log("info_data", info_data)

      const dt_conf = this.getDtConf(info_data);
	  
	  console.log("dt_conf", dt_conf)

      return dt_conf;
   }
}

//module.exports = DtUtils;
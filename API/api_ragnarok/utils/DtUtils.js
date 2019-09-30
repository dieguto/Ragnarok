class DtUtils {

   static addZero(num){
      const num_str = num + "";

      if(num_str.length > 1){
         return num_str;
      } else {
         return "0" + num_str;
      }
   }

   static getDtCompleta(data) {

      let array_dt_lanc = data.split("-");

      let mes = "";
                     
      switch (array_dt_lanc[1]) {
         case "01":
            mes = "Janeiro"
            break;
         
         case "02":
            mes = "Fevereiro"
            break;
      
         case "03":
            mes = "Março"
            break;
      
         case "04":
            mes = "Abril"
            break;
      
         case "05":
            mes = "Maio"
            break;
      
         case "06":
            mes = "Junho"
            break;
      
         case "07":
            mes = "Julho"
            break;
      
         case "08":
            mes = "Agosto"
            break;
      
         case "09":
            mes = "Setembro"
            break;
      
         case "10":
            mes = "Outubro"
            break;
      
         case "11":
            mes = "Novembro"
            break;
      
         case "12":
            mes = "Dezembro"
            break;
      
         default:
            break;
      }

      return array_dt_lanc[2] + " de " + mes + " de " + array_dt_lanc[0];
   }

   static convMes(mes){
      return this.addZero(mes + 1);
   }

   static padrao(dt_string){

      const data  = new Date(dt_string);

      const dia  = this.addZero(data.getDate());

      const mes = this.convMes(data.getMonth());

      const ano = data.getFullYear();

      const dt_banco = ano + "-" + mes + "-" + dia;

      return this.getDtCompleta(dt_banco);
   }

   static padraoComHoras(dt_string){

      const data = new Date(dt_string);

      const segundos = this.addZero(data.getSeconds());

      const minutos = this.addZero(data.getMinutes());
      
      const horas = this.addZero(data.getHours());

      const hora_completa = horas + ":" + minutos + ":" + segundos;

      const dia  = this.addZero(data.getDate());

      const mes = this.convMes(data.getMonth());

      const ano = data.getFullYear();

      const dt_banco = ano + "-" + mes + "-" + dia;

      const dt_completa = this.getDtCompleta(dt_banco);

      return dt_completa + " às " + hora_completa;
   }
}

module.exports = DtUtils;
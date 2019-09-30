const round = require("./Round");

const getDistancia = (coord1, coord2, casas_decimais) => {
   
   const r_lat_c1 = radianos(parseFloat(coord1.lat));
   const r_lon_c1 = radianos(parseFloat(coord1.lon));
   const r_lat_c2 = radianos(parseFloat(coord2.lat));
   const r_lon_c2 = radianos(parseFloat(coord2.lon));

   const distancia = 
      6371 * 

      Math.acos(
         Math.cos( r_lat_c1 ) *
         Math.cos( r_lat_c2 ) *
         Math.cos( r_lon_c2 - r_lon_c1 ) +
         Math.sin( r_lat_c1 ) *
         Math.sin( r_lat_c2 )
      );
   
   return round(distancia, casas_decimais)
};

const radianos = (graus) => {
  return graus * (3.14159265359/180);
}

module.exports = getDistancia;
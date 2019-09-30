const round = (valor, precisao) => {
   const multiplicador = Math.pow(10, precisao || 0);
   return Math.round(valor * multiplicador) / multiplicador;
}

module.exports = round;
const get = (io) => {

   const conversa1 = [{author: "Autor da conversa 1", message: "essa conversa 1 é d+++"}];

   const conversa2 = [{author: "Autor da conversa 2", message: "essa conversa 2 é irada!!!"}];

   io.on("connection", socket => {
      console.log("Usuario com o id de socket '" + socket.id + "' conectado!");

      io.emit("mensagens_anteriores", [{author: "usuario de teste", message: "teste do chat"}]);

      //io.on("conversa1", )
   });
 
   return io;
}

module.exports = get;
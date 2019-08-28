const express = require("express");
const router = express.Router();
const sha512 = require("js-sha512").sha512;
const Usuario = require("../models/Usuario");
const BrCoords = require("../utils/BrasilCoordenadas");

router.post("/", (req, res) => {
   let { nome, email, senha, cep } = req.body;

   const cep_dividido = cep.split("-");

   const cep_sem_traco = cep_dividido[0] + cep_dividido[1];

   BrCoords.getByCep(cep_sem_traco, (err, info) => {
      
      if (err) {
         if (err == 400) {
            res.status(400).json({
               error: [
                  {
                     message: "Cep incorreto!",
                     path: "cep"
                  }
               ]
            }).end()

         } else {
            res.sendStatus(500).end();
         }

      } else {
         const { lat, lon, endereco } = info;

         senha = sha512(senha);

         Usuario.create({
            nome, email, senha,
            endereco, lat, lon,
            is_bloqueado: false,
            is_admin: false

         }).then((usuario) => {
            //201 Criado
            res.sendStatus(201).end();

         }).catch((err) => {
            console.log("Erro ao criar o usuario: " + err)
            //400 Requisição Ruim
            res.status(400).json(err).end();
         });
      }
   })
});

module.exports = router;
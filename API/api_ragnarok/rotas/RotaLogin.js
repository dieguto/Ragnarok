const express = require('express');
const router = express.Router();
const sha512 = require("js-sha512").sha512;
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const Auth = require("../utils/JwtAuth");

router.post('/usuario', (req, res) => {
   let { email, senha } = req.body;

   senha = sha512(senha);

   Usuario.findOne({ where: { email, senha } })
      .then((usuario) => {

         if (usuario.is_bloqueado) {
            //403 Proibido
            console.log("Erro ao gerar token do usuario pois o mesmo esta bloqueado");
            res.sendStatus(403).end();

         } else {
            //POR QUESTÕES DE SEGURANÇA A SENHA É 'ANULADA'
            usuario.senha = undefined;

            jwt.sign({ usuario }, Auth.getKey(), { expiresIn: "24h" }, (err, token) => {
               if (err) {
                  console.log("Erro ao gerar token do usuario: " + err);
                  res.sendStatus(500).end();
               } else {
                  res.json({ token, usuario }).end();
               }
            })
         }
      })
      .catch((err) => {
         console.log("Erro ao autenticar usuario: " + err);
         //404 Não encontrado
         res.sendStatus(404).end();
      });

});

router.post('/admin', (req, res) => {
   let { email, senha } = req.body;

   senha = sha512(senha);

   Usuario.findOne({ where: { email, senha } })
      .then((usuario) => {

         if (usuario.is_bloqueado) {
            //403 Proibido
            console.log("Erro ao gerar token do admnin pois o mesmo esta bloqueado");
            res.sendStatus(403).end();

         } else {
            if (usuario.is_admin) {
               //POR QUESTÕES DE SEGURANÇA A SENHA É 'ANULADA'
               usuario.senha = undefined;

               jwt.sign({ usuario }, Auth.getKey(), { expiresIn: "24h" }, (err, token) => {
                  if (err) {
                     console.log("Erro ao gerar token do admin: " + err);
                     res.sendStatus(500).end();
                  } else {
                     res.json({ token, usuario }).end();
                  }
               })
            } else {
               //403 Proibido
               console.log("Erro ao gerar token do admin, pois o mesmo não possui o privilégio");
               res.sendStatus(403).end();
            }
         }
      })
      .catch((err) => {
         console.log("Erro ao autenticar usuario: " + err);
         //404 Não encontrado
         res.sendStatus(404).end();
      });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const sha512 = require("js-sha512").sha512;
const Usuario = require("../models/Usuario");
//const CepUtils = require("../utils/CepUtils");

router.post("/", (req, res)=>{
    let { nome, email, senha } = req.body;

    senha = sha512(senha);

    // CepUtils.getCoordenadas(cep, (coordendas)=>{
    //     console.log(coordenadas)
    // })

    Usuario.create({
        nome, email, senha,
        is_bloqueado: false,
        is_admin:false

    }).then((usuario)=>{
        //201 Criado
        res.sendStatus(201).end();

    }).catch((err)=>{
        console.log("Erro ao criar o usuario: " + err)
        //400 Requisição Ruim
        res.status(400).json(err).end();
    });
});

module.exports = router;
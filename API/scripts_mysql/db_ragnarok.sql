-- APAGA ALGUMA VERSÃO ANTIGA DO BANCO CASO EXISTA
DROP DATABASE IF EXISTS db_ragnarok;

-- CRIA O BANCO
CREATE DATABASE db_ragnarok;

-- USA O BANCO QUE ACABOU DE SER CRIADO
USE db_ragnarok;

-- CRIA A TABELA DE USUARIO COM 4 USUARIOS ADMINISTRADORES
CREATE TABLE tbl_usuario(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(200) NOT NULL,
	email VARCHAR(100) NOT NULL,
	senha VARCHAR(128) NOT NULL,
	endereco VARCHAR(150) NOT NULL,
	lat DECIMAL(7, 4) NOT NULL,
	lon DECIMAL(7, 4) NOT NULL,
	is_bloqueado TINYINT NOT NULL,
	is_admin TINYINT NOT NULL
);

INSERT INTO tbl_usuario VALUES (0, "Diego Silva", "diego@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1);
INSERT INTO tbl_usuario VALUES (0, "Gabriel Morais", "gabriel@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1);
INSERT INTO tbl_usuario VALUES (0, "Vinicius Morais", "vinicius.m@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1);
INSERT INTO tbl_usuario VALUES (0, "Vinicius Oliveira", "vinicius.o@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1);


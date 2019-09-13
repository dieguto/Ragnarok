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

-- senha carla123, id 5
INSERT INTO tbl_usuario VALUES (0, "Carla", "carla.linda.123@hotmail.com", "b94391bbf77bb9dfc4ccfdf310340ccdb66cd189a8d11c50a4022efece1e2e355657ce52ded0c75f013dd5869bd6428c73914bd831d450d84eca26e012e2ca7a", "SP, Osasco", -23.5346, -46.8195, 0, 0);
-- senha jeimer123
INSERT INTO tbl_usuario VALUES (0, "Jeimer", "jeimer_monstrao@bol.com.br", "0fe1926d699bf7f8149ae31ea507d3f01416cfe318391c1bae536b70c9a67cf83421cda641ee543264b3b4e13b2c6d060e7ca5b0b96e008c7ef2db582c895ddc", "SP, São Paulo", -23.6815, -46.8754, 0, 0);
-- senha hotdog123
INSERT INTO tbl_usuario VALUES (0, "Sausage Dog", "sausage@yahoo.com", "ac27c68ff3b3f6122e67d21fde593e45757143baba0516a5a87709aebc854a53eb94f16342952552a9d08c381429aeab97d07243760a71803c2de8dc2a177121", "CH, Guangzhou", 23.1259, 112.9476, 0, 0);

-- CRIA A TABELA DAS FABRICANTES DE CONSOLES
CREATE TABLE tbl_fabricante(
	id_fabricante INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
);

INSERT INTO tbl_fabricante VALUES (0, "Playstation");
INSERT INTO tbl_fabricante VALUES (0, "Xbox");
INSERT INTO tbl_fabricante VALUES (0, "Nintendo");

-- CRIA A TABELA DOS CONSOLES
CREATE TABLE tbl_console(
	id_console  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_fabricante INT NOT NULL,
	nome VARCHAR(50) NOT NULL,
	CONSTRAINT fk_id_fabricante_on_console
	FOREIGN KEY (id_fabricante)
	REFERENCES tbl_fabricante(id_fabricante)
);

INSERT INTO tbl_console VALUES (0, 1, "Playstation 2");
INSERT INTO tbl_console VALUES (0, 1, "Playstation 3");
INSERT INTO tbl_console VALUES (0, 1, "Playstation 4");

INSERT INTO tbl_console VALUES (0, 2, "Xbox 360");
INSERT INTO tbl_console VALUES (0, 2, "Xbox One");

INSERT INTO tbl_console VALUES (0, 3, "Nintendo Wii");
INSERT INTO tbl_console VALUES (0, 3, "Nintendo 3DS");
INSERT INTO tbl_console VALUES (0, 3, "Nintendo Switch");

-- CRIA TABELA DE GENEROS
CREATE TABLE tbl_genero(
	id_genero INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL
);

INSERT INTO tbl_genero VALUES (0, "Ação");
INSERT INTO tbl_genero VALUES (0, "Aventura");
INSERT INTO tbl_genero VALUES (0, "Corrida");
INSERT INTO tbl_genero VALUES (0, "Dança");
INSERT INTO tbl_genero VALUES (0, "Esportes");
INSERT INTO tbl_genero VALUES (0, "Estratégia");
INSERT INTO tbl_genero VALUES (0, "Infantil");
INSERT INTO tbl_genero VALUES (0, "Luta");
INSERT INTO tbl_genero VALUES (0, "Música");
INSERT INTO tbl_genero VALUES (0, "Plataforma");
INSERT INTO tbl_genero VALUES (0, "Puzzle");
INSERT INTO tbl_genero VALUES (0, "RPG");
INSERT INTO tbl_genero VALUES (0, "Simulação");
INSERT INTO tbl_genero VALUES (0, "Stealth");
INSERT INTO tbl_genero VALUES (0, "Terror");
INSERT INTO tbl_genero VALUES (0, "FPS");

-- CRIA A TABELA DOS ANUNCIOS
CREATE TABLE tbl_anuncio(
	id_usuario INT NOT NULL,
	id_anuncio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	titulo VARCHAR(100) NOT NULL,
	descricao TEXT,
	imagens TEXT NOT NULL,
	CONSTRAINT fk_id_usuario_on_anuncio
	FOREIGN KEY (id_usuario)
	REFERENCES tbl_usuario(id)
);

-- CRIA TABELA RELACIONAMENTO ANUNCIO-CATEGORIA
CREATE TABLE tbl_anuncio_categoria(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	is_acessorio TINYINT NOT NULL,
	id_console INT NOT NULL,
	id_anuncio INT NOT NULL,
	id_genero INT,

	CONSTRAINT fk_id_console_on_anuncio_categoria
	FOREIGN KEY (id_console)
	REFERENCES tbl_console(id_console),

	CONSTRAINT fk_id_genero_on_anuncio_categoria
	FOREIGN KEY (id_genero)
	REFERENCES tbl_genero(id_genero),

	CONSTRAINT fk_id_anuncio_on_anuncio_categoria
	FOREIGN KEY (id_anuncio)
	REFERENCES tbl_anuncio(id_anuncio)

);


-- anuncio da carla
INSERT INTO tbl_anuncio VALUES (5, 0, "Barbie Golpe Do Bau", "Como como ter uma vida boa, as custas de um troxa (pirata pra play 2)", "abcde.com/aaa.jpg");
INSERT INTO tbl_anuncio_categoria VALUES (0, 0, 1, 1, 14);

-- anuncio do jeimer
INSERT INTO tbl_anuncio VALUES (6, 0, "Free Fire(CRAQIADUU!!11!!!!1!)", "Vem com racke de vida sem limiitis(n morre, igual o coringão eterno, palmeiras sem mundial) APENAS GADÃO!!!", "abcde.com/bbb.jpg");
INSERT INTO tbl_anuncio_categoria VALUES (0, 0, 4, 2, 6);

-- anuncio do Sausage Dog
INSERT INTO tbl_anuncio VALUES (7, 0, "Dog Boys", "Como ter uma vida de dogão (tem churrasqueira, só o filezinho)", "abcde.com/ccc.jpg");
INSERT INTO tbl_anuncio_categoria VALUES (0, 0, 8, 3, 15);
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
	is_admin TINYINT NOT NULL,
   cep VARCHAR(9) NOT NULL,

	criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
	excluido_em TIMESTAMP NULL
);

INSERT INTO tbl_usuario VALUES (0, "Diego Silva", "diego@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1, "06600-025", now(), now(), null);
INSERT INTO tbl_usuario VALUES (0, "Gabriel Morais", "gabriel@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1, "06600-025", now(), now(), null);
INSERT INTO tbl_usuario VALUES (0, "Vinicius Morais", "vinicius.m@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1, "06600-025", now(), now(), null);
INSERT INTO tbl_usuario VALUES (0, "Vinicius Oliveira", "vinicius.o@ragnarok.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "SP, Jandira", -23.5289, -46.8991, 0, 1, "06600-025", now(), now(), null);

-- senha carla123, id 5
INSERT INTO tbl_usuario VALUES (0, "Carla", "carla.linda.123@hotmail.com", "b94391bbf77bb9dfc4ccfdf310340ccdb66cd189a8d11c50a4022efece1e2e355657ce52ded0c75f013dd5869bd6428c73914bd831d450d84eca26e012e2ca7a", "SP, Osasco", -23.5156, -46.7965, 0, 0, "06233-020", now(), now(), null);
-- senha jeimer123
INSERT INTO tbl_usuario VALUES (0, "Jeimer", "jeimer_monstrao@bol.com.br", "0fe1926d699bf7f8149ae31ea507d3f01416cfe318391c1bae536b70c9a67cf83421cda641ee543264b3b4e13b2c6d060e7ca5b0b96e008c7ef2db582c895ddc", "SP, São Paulo", -23.5506, -46.6366, 0, 0, "01001-001", now(), now(), null);
-- senha hotdog123
INSERT INTO tbl_usuario VALUES (0, "Sausage Dog", "sausage@yahoo.com", "ac27c68ff3b3f6122e67d21fde593e45757143baba0516a5a87709aebc854a53eb94f16342952552a9d08c381429aeab97d07243760a71803c2de8dc2a177121", "MS, Campo Grande", -20.4652, -54.6312, 0, 0, "79002-070", now(), now(), null);
-- senha 123456
INSERT INTO tbl_usuario VALUES (0, "Chimba", "chimba@outlook.com", "ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413", "AM, Cordajás", -1.3509, -48.4581, 0, 0, "66635-110", now(), now(), null);

-- CRIA A TABELA DAS FABRICANTES DE CONSOLES
CREATE TABLE tbl_fabricante(
	id_fabricante INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	
	criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
	excluido_em TIMESTAMP NULL
);

INSERT INTO tbl_fabricante VALUES (0, "Sony", now(), now(), null);
INSERT INTO tbl_fabricante VALUES (0, "Microsoft", now(), now(), null);
INSERT INTO tbl_fabricante VALUES (0, "Nintendo", now(), now(), null);

-- CRIA A TABELA DOS CONSOLES
CREATE TABLE tbl_console(
	id_console  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_fabricante INT NOT NULL,
	nome VARCHAR(50) NOT NULL,
	
	criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
	excluido_em TIMESTAMP NULL,

	CONSTRAINT fk_id_fabricante_on_tbl_console
	FOREIGN KEY (id_fabricante)
	REFERENCES tbl_fabricante(id_fabricante)
);


INSERT INTO tbl_console VALUES (0, 1, "Playstation 2", now(), now(), null);
INSERT INTO tbl_console VALUES (0, 1, "Playstation 3", now(), now(), null);
INSERT INTO tbl_console VALUES (0, 1, "Playstation 4", now(), now(), null);

INSERT INTO tbl_console VALUES (0, 2, "Xbox 360", now(), now(), null);
INSERT INTO tbl_console VALUES (0, 2, "Xbox One", now(), now(), null);

INSERT INTO tbl_console VALUES (0, 3, "Nintendo Wii", now(), now(), null);
INSERT INTO tbl_console VALUES (0, 3, "Nintendo 3DS", now(), now(), null);
INSERT INTO tbl_console VALUES (0, 3, "Nintendo Switch", now(), now(), null);

-- CRIA TABELA DE GENEROS
CREATE TABLE tbl_genero(
	id_genero INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	
	criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
	excluido_em TIMESTAMP NULL
);

INSERT INTO tbl_genero VALUES (0, "Ação", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Aventura", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Corrida", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Dança", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Esportes", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Estratégia", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Infantil", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Luta", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Música", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Plataforma", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Puzzle", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "RPG", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Simulação", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Stealth", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "Terror", now(), now(), null);
INSERT INTO tbl_genero VALUES (0, "FPS", now(), now(), null);

-- CRIA A TABELA DOS ANUNCIOS
CREATE TABLE tbl_anuncio(
	id_anuncio INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT NOT NULL,
   titulo VARCHAR(150) NOT NULL,
	descricao TEXT,
	c_fotos VARCHAR(300) NOT NULL,
   id_console INT NOT NULL,

   id_console_troca INT,
	slug_jogo_troca VARCHAR(150),
	preco DECIMAL(6, 2),

   slug_jogo VARCHAR(150),
   id_genero INT,

   is_acessorio TINYINT NOT NULL,
	is_console TINYINT NOT NULL,
   is_jogo TINYINT NOT NULL,

   info_rawg TEXT,

	criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
	excluido_em TIMESTAMP NULL,

	CONSTRAINT fk_id_usuario_on_tbl_anuncio
	FOREIGN KEY (id_usuario)
	REFERENCES tbl_usuario(id),
	
	CONSTRAINT fk_id_console_troca_on_tbl_anuncio
	FOREIGN KEY (id_console_troca)
	REFERENCES tbl_console(id_console),

   CONSTRAINT fk_id_console_on_tbl_anuncio
	FOREIGN KEY (id_console)
	REFERENCES tbl_console(id_console),

	CONSTRAINT fk_id_genero_on_tbl_anuncio
	FOREIGN KEY (id_genero)
	REFERENCES tbl_genero(id_genero)
);

-- 1° anuncio da carla
INSERT INTO tbl_anuncio VALUES 
(
	0,
	5,
	"GTA San Andreas ('zerado')",
	"Gta sa zerado na caixa pra play 2",
	'["fotos/1/0.jpg","fotos/1/1.jpg","fotos/1/2.jpg"]',
	1,
	null,
	null,
	20,
	"grand-theft-auto-san-andreas",
	1,
	0,
	0,
	1,
   '{"jogo":{"nota_metacritic":93,"nota_geral":4.4,"nome":"Grand Theft Auto: San Andreas","dt_lancamento":"26 de Outubro de 2004","imagem_fundo":"https://media.rawg.io/media/games/1bb/1bb86c35ffa3eb0d299b01a7c65bf908.jpg","imagem_fundo_adicional":"https://media.rawg.io/media/screenshots/236/236efd76a15fca0ce4d9129a788e517e.jpg","video":"https://media.rawg.io/media/stories-640/3d0/3d0f771fd1c11a0e1e3ba62d95d916ae.mp4","preview_video":"https://media.rawg.io/media/stories-previews/1d0/1d01321bc0f86a1c576e2329bdf13f8f.jpg","desenvolvedoras":["Rockstar Games","Rockstar North"],"publishers":["Rockstar Games"]}}',
	now(), now(), null	  
);

-- 1° anuncio do jeimer
INSERT INTO tbl_anuncio VALUES 
(
	0,
	6,
	"Rattatouile pra ps2",
	"Ratatouille la... pra xcaixa 360",
	'["fotos/2/0.jpg","fotos/2/1.jpg","fotos/2/2.jpg"]',
	4,
	null,
	null,
	30.49,
	"ratatouille",
	7,
	0,
	0,
	1,
   '{"jogo":{"nota_metacritic":null,"nota_geral":3.8,"nome":"Ratatouille","dt_lancamento":"26 de Junho de 2007","imagem_fundo":"https://media.rawg.io/media/screenshots/041/0412a799c141fe81f72ed4b44e63e0c6.jpg","imagem_fundo_adicional":"https://media.rawg.io/media/screenshots/94f/94f92221ae6027c312bc8ad5a73b1a70.jpg","video":null,"desenvolvedoras":["Asobo Studio","Heavy Iron Studios","THQ","small","Locomotive Games","Helixe","Universomo"],"publishers":["Disney Interactive","THQ"]}}',
	now(), now(), null
);

-- 1° anuncio do Sausage Dog
INSERT INTO tbl_anuncio VALUES 
(
	0,
	7,
	"Jogo da barbie",
	"Barbie, pro 3ds ;)",
	'["fotos/3/0.jpg","fotos/3/1.jpg","fotos/3/2.jpg"]',
	7,
	null,
	null,
	120.20,
	"barbie-horse-adventures-riding-camp",
	7,
	0,
	0,
	1,
   '{"jogo":{"nota_metacritic":null,"nota_geral":0,"nome":"Barbie Horse Adventures: Riding Camp","dt_lancamento":"21 de Outubro de 2008","imagem_fundo":"https://media.rawg.io/media/screenshots/14e/14e30a9531ebbb9bb662a0d92865b7b8.jpg","imagem_fundo_adicional":"https://media.rawg.io/media/screenshots/7c7/7c7f6f3449bf5f54e91e61bda3a0ad05.jpg","video":null,"desenvolvedoras":["Pixel Tales"],"publishers":["Activision Blizzard","Activision Value Publishing"]}}', 
   now(), now(), null
);

-- 1° anuncio do Chimba
INSERT INTO tbl_anuncio VALUES 
(
	0,
	8,
	"Controle de xbox 360 feio",
	"Controle usado pouco de xbox 360",
	'["fotos/4/0.jpg","fotos/4/1.jpg","fotos/4/2.jpg"]',
	4,
	null,
	null,
	19.99,
	null,
	null,
	1,
	0,
	0,
   null, 
   now(), now(), null
);

-- 2° anuncio da carla
INSERT INTO tbl_anuncio VALUES 
(
	0,
	5,
	"headset de play 3 feio",
	"headset usado pra demais de play 3",
	'["fotos/5/0.jpg","fotos/5/1.jpg","fotos/5/2.jpg"]',
	2,
	null,
	null,
	79.90,
	null,
	null,
	1,
	0,
	0,
   null, 
   now(), now(), null
);

-- 2° anuncio do jeimer
INSERT INTO tbl_anuncio VALUES 
(
	0,
	6,
	"um nitendo switch filézin",
	null,
	'["fotos/6/0.jpg","fotos/6/1.jpg","fotos/6/2.jpg"]',
	8,
	null,
	null,
	49.50,
	null,
	null,
	0,
	1,
	0,
   null, 
   now(), now(), null
);

-- 2° anuncio do Sausage Dog
INSERT INTO tbl_anuncio VALUES 
(
	0,
	7,
	"troco Mineirinho ultra adventures de xbox one por No man's sky de ps4",
	null,
	'["fotos/7/0.jpg","fotos/7/1.jpg","fotos/7/2.jpg"]',
	5,
	3,
	"no-mans-sky",
	null,
	"miner-ultra-adventures",
	null,
	0,
	0,
	1,
   '{"jogo":{"nota_metacritic":null,"nota_geral":0,"nome":"Miner Ultra Adventures","dt_lancamento":"27 de Janeiro de 2017","imagem_fundo":"https://media.rawg.io/media/screenshots/ee6/ee659851099b2cdca5d583880386e8cc.jpg","imagem_fundo_adicional":"https://media.rawg.io/media/screenshots/6e3/6e31e98eda2f1cb4d9461c814f1501c3.jpg","video":null,"desenvolvedoras":["Old School Blender Addicted"],"publishers":["Manic Mind Game Lab"]},"jogo_troca":{"nota_metacritic":61,"nota_geral":3.7,"nome":"No Mans Sky","dt_lancamento":"09 de Agosto de 2016","imagem_fundo":"https://media.rawg.io/media/games/174/1743b3dd185bda4a7be349347d4064df.jpg","imagem_fundo_adicional":"https://media.rawg.io/media/screenshots/914/914ad9dcc3603508f0200ed8073d00f4.jpg","video":"https://media.rawg.io/media/stories-640/7f6/7f6303ed351e6c2454ed909a90815d1d.mp4","preview_video":"https://media.rawg.io/media/stories-previews/322/322a68b347ebd990240b4b0a22b4a85b.jpg","desenvolvedoras":["Hello Games","Hello Games LTD"],"publishers":["Hello Games"]}}', 
   now(), now(), null
);

-- 2° anuncio do Chimba
INSERT INTO tbl_anuncio VALUES 
(
	0,
	8,
	"troco No man's sky de PS4 por Mineirinho ultra adventures de xbox one",
	null,
	'["fotos/8/0.jpg","fotos/8/1.jpg","fotos/8/2.jpg"]',
	3,
	5,
	"miner-ultra-adventures",
	null,
	"no-mans-sky",
	null,
	0,
	0,
	1,
   '{"jogo_troca":{"nota_metacritic":null,"nota_geral":0,"nome":"Miner Ultra Adventures","dt_lancamento":"27 de Janeiro de 2017","imagem_fundo":"https://media.rawg.io/media/screenshots/ee6/ee659851099b2cdca5d583880386e8cc.jpg","imagem_fundo_adicional":"https://media.rawg.io/media/screenshots/6e3/6e31e98eda2f1cb4d9461c814f1501c3.jpg","video":null,"desenvolvedoras":["Old School Blender Addicted"],"publishers":["Manic Mind Game Lab"]},"jogo":{"nota_metacritic":61,"nota_geral":3.7,"nome":"No Mans Sky","dt_lancamento":"09 de Agosto de 2016","imagem_fundo":"https://media.rawg.io/media/games/174/1743b3dd185bda4a7be349347d4064df.jpg","imagem_fundo_adicional":"https://media.rawg.io/media/screenshots/914/914ad9dcc3603508f0200ed8073d00f4.jpg","video":"https://media.rawg.io/media/stories-640/7f6/7f6303ed351e6c2454ed909a90815d1d.mp4","preview_video":"https://media.rawg.io/media/stories-previews/322/322a68b347ebd990240b4b0a22b4a85b.jpg","desenvolvedoras":["Hello Games","Hello Games LTD"],"publishers":["Hello Games"]}}', 
   now(), now(), null
);

-- ESTRUTRA DO CHAT E DAS MENSAGENS

CREATE TABLE tbl_chat(
	id_chat INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   id_anuncio INT NOT NULL,
   c_foto VARCHAR(300) NOT NULL,
   criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
   excluido_em TIMESTAMP NULL,
	is_ativo TINYINT NOT NULL,

   CONSTRAINT fk_id_anuncio_on_tbl_chat
	FOREIGN KEY (id_anuncio)
	REFERENCES tbl_anuncio(id_anuncio)
);

-- CRIANDO CHAT SOBRE O PRIMEIRO ANUNCIO, O DO GTA SAN ANDREAS
INSERT INTO tbl_chat VALUES (0, 1, 'fotos/1/0.jpg', now(), now(), NULL, 1);

INSERT INTO tbl_chat VALUES (0, 3, 'fotos/3/0.jpg', now(), now(), NULL, 1);

CREATE TABLE tbl_chat_usuario(
   id_chat_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_chat INT NOT NULL,
   id_usuario INT NOT NULL,
   criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
   excluido_em TIMESTAMP NULL,
   
   CONSTRAINT fk_id_usuario_on_tbl_chat_usuario
	FOREIGN KEY (id_usuario)
	REFERENCES tbl_usuario(id),

	CONSTRAINT fk_id_chat_on_tbl_chat_usuario
	FOREIGN KEY (id_chat)
	REFERENCES tbl_chat(id_chat)
);

-- ADICIONANDO A CARLA (DONA DO ANUNCIO), E JEIMER AO CHAT
INSERT INTO tbl_chat_usuario VALUES (0, 1, 5, now(), now(), NULL);
INSERT INTO tbl_chat_usuario VALUES (0, 1, 6, now(), now(), NULL);

INSERT INTO tbl_chat_usuario VALUES (0, 2, 5, now(), now(), NULL);
INSERT INTO tbl_chat_usuario VALUES (0, 2, 7, now(), now(), NULL);

CREATE TABLE tbl_mensagem(
   id_mensagem INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   para INT NOT NULL,
   mensagem TEXT NOT NULL,
   visualizada TINYINT NOT NULL,
   criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
   excluido_em TIMESTAMP NULL,

   CONSTRAINT fk_id_chat_usuario_on_tbl_mensagem
	FOREIGN KEY (para)
	REFERENCES tbl_chat_usuario(id_chat_usuario)
);

-- ADICIONANDO ALGUMAS MENSAGENS AO CHAT
INSERT INTO tbl_mensagem VALUES (0, 1, "Oi Carla, tudo bem?", 1, now(), now(), NULL);
INSERT INTO tbl_mensagem VALUES (0, 2, "OLÁ Jeimer, está tudo sim", 1, now(), now(), NULL);
INSERT INTO tbl_mensagem VALUES (0, 1, "Faz rolo desse gta num moto g2 trincado?", 0, now(), now(), NULL);

INSERT INTO tbl_mensagem VALUES (0, 3, "Oi carla", 0, now(), now(), NULL);
INSERT INTO tbl_mensagem VALUES (0, 3, "Hoje é terça feira?", 0, now(), now(), NULL);

CREATE TABLE tbl_notificacao(
   id_notificacao INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   id_chat  INT NOT NULL,
   para_usuario  INT NOT NULL,
   info TEXT NOT NULL,
   is_mensagem TINYINT NOT NULL,
   is_chat TINYINT NOT NULL,
   visualizada TINYINT NOT NULL,
   criado_em TIMESTAMP,
	atualizado_em TIMESTAMP,
   excluido_em TIMESTAMP NULL,
   
   CONSTRAINT fk_id_usuario_on_tbl_notificacao
	FOREIGN KEY (para_usuario)
	REFERENCES tbl_usuario(id),

	CONSTRAINT fk_id_chat_on_tbl_notificacao
	FOREIGN KEY (id_chat)
	REFERENCES tbl_chat(id_chat)
);

INSERT INTO tbl_notificacao 
VALUES (
   0, 
   1, 
   5, 
   "O usuario Jeimer iniciou um chat de troca com você",
   0,
   1,
   0,
   now(),
   now(),
   null
);

INSERT INTO tbl_notificacao 
VALUES (
   0, 
   1, 
   5, 
   "Jeimer enviou 'Faz rolo desse gta num moto g2 trincado?'",
   1,
   0,
   0,
   now(),
   now(),
   null
);

INSERT INTO tbl_notificacao 
VALUES (
   0, 
   2, 
   5, 
   "O usuario Sausage Dog iniciou um chat com você",
   0,
   1,
   0,
   now(),
   now(),
   null
);

INSERT INTO tbl_notificacao 
VALUES (
   0, 
   2, 
   5, 
   "Sausage Dog enviou 'Oi carla'",
   1,
   0,
   0,
   now(),
   now(),
   null
);

INSERT INTO tbl_notificacao 
VALUES (
   0, 
   2, 
   5, 
   "Sausage Dog enviou 'Hoje é terça feira?'",
   1,
   0,
   0,
   now(),
   now(),
   null
);
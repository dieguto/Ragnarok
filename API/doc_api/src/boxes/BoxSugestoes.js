import React, { Component } from 'react';
import CardPrincipal from '../components/ComponentCardPrincipal';
import CardRota from '../components/ComponentCardRota';

class BoxSugestoes extends Component{

   componentWillMount(){
      this.titulo = "Sugestões"
      this.parentAcc = "accordion" + this.titulo.replace(/ /g, "_");

      //======================

      this.respSugestoes = [
         {
            status:200,
            resp:{
               tipo:"customizada",
               customJson:[
                    {
                        "nome": "Grand Theft Auto V",
                        "slug": "grand-theft-auto-v",
                        "dt_lancamento": "17 de Setembro de 2013",
                        "imagem_fundo": "https://media.rawg.io/media/games/978/9780426199d92d086e7c85ed8993cede.jpg",
                        "video": "https://media.rawg.io/media/stories-640/5b0/5b0cfff8c606c5e4db4f74f108c4413b.mp4",
                        "preview_video": "https://media.rawg.io/media/stories-previews/f65/f6593df6c8df32c7f4763f9cb112a514.jpg"
                    },
                    {
                        "nome": "Gears 5",
                        "slug": "gears-5",
                        "dt_lancamento": "10 de Setembro de 2019",
                        "imagem_fundo": "https://media.rawg.io/media/games/121/1213f8b9b0a26307e672cf51f34882f8.jpg",
                        "video": "https://media.rawg.io/media/stories-640/dd1/dd193ed84a5113be6c6c4f8fb8206a81.mp4",
                        "preview_video": "https://media.rawg.io/media/stories-previews/b7a/b7af3e10a494b7e8352de0defc2b1c6c.jpg"
                    },
                    {
                        "nome": "Persona 5",
                        "slug": "persona-5",
                        "dt_lancamento": "15 de Setembro de 2016",
                        "imagem_fundo": "https://media.rawg.io/media/games/0df/0df4c2148306dc53963b3ad957bedc55.jpg",
                        "video": "https://media.rawg.io/media/stories-640/365/3659f1204dd37955e4f5197492fe289b.mp4",
                        "preview_video": "https://media.rawg.io/media/stories-previews/a2b/a2bf65bd5c35c6dd7e9e9ef755aa812f.jpg"
                    },
                    {
                        "nome": "Resident Evil 5",
                        "slug": "resident-evil-5-biohazard-5",
                        "dt_lancamento": "05 de Março de 2009",
                        "imagem_fundo": "https://media.rawg.io/media/games/974/974342a3959981a17bdbbff2fd7f97b0.jpg",
                        "video": "https://media.rawg.io/media/stories-640/fa2/fa29a9ee51e74bbdc16c2e5b6e3488c8.mp4",
                        "preview_video": "https://media.rawg.io/media/stories-previews/afb/afbf7a2b557f229013fd0046a7b64a45.jpg"
                    },
                    {
                        "nome": "Smugglers 5: Invasion",
                        "slug": "smugglers-5-invasion",
                        "dt_lancamento": "16 de Outubro de 2014",
                        "imagem_fundo": "https://media.rawg.io/media/screenshots/e40/e40dc36bb95d18c8c4434e1c25fe07b8.jpg",
                        "video": null
                    },
                    {
                        "nome": "Geneforge 5: Overthrow",
                        "slug": "geneforge-5-overthrow",
                        "dt_lancamento": "28 de Novembro de 2008",
                        "imagem_fundo": "https://media.rawg.io/media/screenshots/d18/d18683e862aa53d7a9f853ecd97876b4.jpg",
                        "video": null
                    },
                    {
                        "nome": "Halo 5: Guardians",
                        "slug": "halo-5-guardians",
                        "dt_lancamento": "27 de Outubro de 2015",
                        "imagem_fundo": "https://media.rawg.io/media/games/77f/77fb27e5b7ec6984f43a70a289376e6a.jpg",
                        "video": "https://media.rawg.io/media/stories-640/232/2320e9bb4bace10330f42631df79dd83.mp4",
                        "preview_video": "https://media.rawg.io/media/stories-previews/6e1/6e170e1f7c13c1fe22946d6f75582c0b.jpg"
                    },
                    {
                        "nome": "Dungeon Hunter 5",
                        "slug": "dungeon-hunter-5",
                        "dt_lancamento": "11 de Março de 2015",
                        "imagem_fundo": "https://media.rawg.io/media/screenshots/307/3073e0271fdc919c9ee446a9fb8de63f.jpg",
                        "video": null
                    },
                    {
                        "nome": "GTA-bankrob",
                        "slug": "gta-bankrob",
                        "dt_lancamento": "10 de Abril de 2017",
                        "imagem_fundo": "https://media.rawg.io/media/screenshots/70d/70d98f3c42cdc6db6cfd6318e6519b96.jpg",
                        "video": null
                    },
                    {
                        "nome": "GTA-V-DEMO (itch)",
                        "slug": "gta-v-demo",
                        "dt_lancamento": "02 de Março de 2014",
                        "imagem_fundo": null,
                        "video": null
                    }
                ]
            }
         },
         {
            status:404,
            resp:null
         },
         {
            status:500,
            resp:null
         }
      ]
      //JSON's da rota de aieou ===========
   }
   
   render(){
      return(
      
         <CardPrincipal titulo={ this.titulo }>

            <CardRota parentAcc={ this.parentAcc } titulo='Buscar Sugestões' metodo='get' 
               rota="/sugestoes/:termo_pesquisa/:limite" jsonResp={ this.respSugestoes } />

         </CardPrincipal>

      );
   }

}

export default BoxSugestoes;
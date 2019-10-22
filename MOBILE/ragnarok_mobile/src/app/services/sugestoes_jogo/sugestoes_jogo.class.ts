export class SugestoesJogo {
    nome: String;
    slug: String;
    imagem_fundo:String;
    dt_lancamento:String;
    video:String;


    constructor(data: any){
        if(data){
            this.nome = data.nome;
            this.slug = data.slug;
            this.dt_lancamento = data.dt_lancamento;
            this.imagem_fundo = data.imagem_fundo;
            this.video = data.video;
        }
    }

    toString(){
        return this.video,this.nome,this.imagem_fundo,this.slug, this.dt_lancamento;
    }

}
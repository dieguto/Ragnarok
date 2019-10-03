export class SugestoesJogo {
    nome: String;
    slug: String;
    imagem_fundo:String;
    dt_lancamento:String;


    constructor(data: any){
        if(data){
            this.nome = data.nome;
            this.slug = data.slug;
            this.dt_lancamento = data.dt_lancamento;
            this.imagem_fundo = data.imagem_fundo;
        }
    }

    toString(){
        return this.nome,this.imagem_fundo,this.slug, this.dt_lancamento;
    }

}
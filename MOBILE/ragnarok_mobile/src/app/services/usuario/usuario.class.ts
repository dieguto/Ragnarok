export class Usuario{
    id: Number;
    nome: String;
    email: String;
    cep: String;
    senha: String; 
    info_rawg: String;
    anuncios: String;
    jogo: String;

    constructor(data: any){
        if(data){
            this.info_rawg =  data.info_rawg;
            this.anuncios = data.anuncios;
            this.jogo = data.jogo;
            this.nome = data.nome;
            this.email = data.email;
            this.cep = data.cep;
            this.id = data.id;
            
        }
    }

    toString(){
        return this.info_rawg,this.anuncios, this.jogo, this.nome, this.email, this.cep, this.id;
    }
}

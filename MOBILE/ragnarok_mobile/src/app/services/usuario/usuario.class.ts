export class Usuario{
    id: Number;
    nome: String;
    email: String;
    cep: String;
    anuncios:String;
    titulo:String;
    info_rawg: String;
    senha:String;
    is_jogo:String;


    constructor(data: any){
        if(data){
  
            this.nome = data.nome;
            this.email = data.email;
            this.cep = data.cep;
            this.id = data.id;
            this.anuncios = data.anuncios;
            this.titulo = data.titulo;
            this.info_rawg = data.info_rawg;
            this.senha = data.senha;
            this.is_jogo = data.is_jogo;
            
        }
    }

    toString(){
        return this.is_jogo, this.senha , this.info_rawg, this.titulo, this.nome, this.email, this.cep, this.id, this.anuncios;
    }
}

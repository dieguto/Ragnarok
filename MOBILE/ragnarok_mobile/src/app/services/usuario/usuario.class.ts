export class Usuario{
    id: Number;
    nome: String;
    email: String;
    cep: String;
    anuncios:String;
    titulo:String;
    info_rawg: String;
    senha:String;


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
            
        }
    }

    toString(){
        return this.senha , this.info_rawg, this.titulo, this.nome, this.email, this.cep, this.id, this.anuncios;
    }
}

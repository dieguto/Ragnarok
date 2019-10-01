export class Genero {
    id_genero: Number;
    nome: String;

    constructor(data: any){
        if(data){
            this.id_genero = data.id;
            this.nome = data.nome;
        }
    }

    toString(){
        return this.nome;
    }
}
export class Console{
    id_console: Number;
    id_fabricante: Number;
    nome: String;

    constructor(data: any){
        if(data){
            this.id_console = data.id;
            this.nome = data.nome;
        }
    }

    toString(){
        return this.nome;
    }

}
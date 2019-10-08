export class Anuncio {
    titulo:String;
    descricao:String;
    is_jogo:boolean;
    slug_jogo:String;
    id_genero:Number;
    id_console_troca:Number;
    id_console:Number;
    slug_jogo_troca:String;
    preco:Number;
    array_fotos_base64:[String];

    constructor(data: any){
        if(data){

            this.titulo = data.titulo;
            this.descricao = data.descricao;
            this.is_jogo = data.is_jogo;
            this.slug_jogo = data.slug_jogo;
            this.id_genero = data.id_genero;
            this.id_console = data.id_console;
            this.id_console_troca = data.id_console_troca;
            this.slug_jogo_troca = data.slug_jogo_troca;
            this.preco = data.preco;
            this.array_fotos_base64 = data.array_fotos_base64;
        }
    }

    toString(){
        return this.titulo, this.descricao, this.is_jogo, this.slug_jogo, this.id_console_troca, this.slug_jogo_troca, this.preco, this.array_fotos_base64, this.id_genero;
    }
}
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Anuncio {
    titulo:String;
    descricao:String;
    is_jogo:boolean;
    slug_jogo:String;
    id_genero:String;
    id_console_troca:String;
    id_console:String;
    slug_jogo_troca:String;
    preco:number;
    array_fotos_base64:[String];
    info_rawg:string;
    jogo:string;
    c_fotos:string;
    distancia:String;
   


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
            this.info_rawg = data.info_rawg;
            this.jogo = data.jogo;
            this.c_fotos = data.c_fotos;
            this.distancia = data.distancia;
            
        }
    }

    toString(){
        return this.distancia, this.c_fotos, this.jogo, this.info_rawg, this.titulo, this.descricao, this.is_jogo, this.slug_jogo, this.id_console_troca, this.slug_jogo_troca, this.preco, this.array_fotos_base64, this.id_genero;
    }
}
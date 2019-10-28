import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class Anuncio {
    titulo:String;
    descricao:String;
    is_jogo:boolean;
    is_console:boolean;
    slug_jogo:String;
    id_genero:String;
    id_console_troca:String;
    id_console:String;
    slug_jogo_troca:String;
    preco:String;
    array_fotos_base64:[String];
    info_rawg:string;
    jogo:string;
    c_fotos:string;
    distancia:String;
    id_anuncio:Number;
    console:String;
    console_troca:String;
    usuario:String;
    dt_lancamento:string
   


    constructor(data: any){
        if(data){

            this.titulo = data.titulo;
            this.id_anuncio = data.id_anuncio;
            this.descricao = data.descricao;
            this.is_jogo = data.is_jogo;
            this.is_console = data.is_console;
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
            this.console = data.console;
            this.console_troca = data.console_troca;
            this.usuario = data.usuario;
            this.dt_lancamento = data.dt_lancamento;
            
        }
    }

    toString(){
        return this.dt_lancamento, this.usuario, this.console_troca,this.console,this.id_anuncio, this.is_console, this.distancia, this.c_fotos, this.jogo, this.info_rawg, this.titulo, this.descricao, this.is_jogo, this.slug_jogo, this.id_console_troca, this.slug_jogo_troca, this.preco, this.array_fotos_base64, this.id_genero;
    }
}
import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//FaExclamationCircle
//CONSTANTES DOS TIPOS DE NOTIFICAÇÃO  
export const SUCESSO = "success";
export const INFO = "info";
export const AVISO = "warning";
export const ERRO = "error";
export const PADRAO = "default";

//CONSTANTES DE MENSAGENS GENÉRICAS
export const CAMPO_VAZIO = "Preencha todos os campos";
export const ERRO_CONEXAO = "Erro de conexão";

//FUNÇÃO DE NOTIFICAÇÃO
export const Notificacao = (tipo, mensagem) => {

    const parametros = {

        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    }

    const msgBraca = (<font className="text-light">{mensagem} </font>)
    const msgPreta = (<font className="text-dark">{mensagem} </font>)


    switch (tipo) {
        case 'info':
            toast.info(msgBraca, {
                parametros
            });
            break;
        case 'success':
            toast.success(msgBraca, {
                parametros
            });
            break;
        case 'warning':
            toast.warn(msgPreta, {
                parametros
            });
            break;
        case 'error':
            toast.error(msgBraca, {
                parametros
            });
            break;
        case 'default':
            toast(msgPreta, {
                parametros
            });
            break;
        default:

    }

}
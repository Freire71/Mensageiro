import {
    MODIFICA_CONTATO_EMAIL,
    ADICIONA_CONTATO_SUCESSO,
    ADICIONA_CONTATO_ERRO,
    MODIFICA_CAMPO_MENSAGEM,
    ENVIO_MENSAGEM
} from '../types/AppTypes';


const INITIAL_STATE = {
    adicionaContatoEmail: '',
    adicionaContatoMensagemSucesso: '',
    adicionaContatoMensagemErro: '',
    mensagem: ''
};

export default (state = INITIAL_STATE, action ) => {
    switch(action.type){
        case MODIFICA_CONTATO_EMAIL:
            return {...state, adicionaContatoEmail: action.payload };
        case ADICIONA_CONTATO_SUCESSO:
            return {...state, adicionaContatoEmail: '', adicionaContatoMensagemSucesso: action.payload, adicionaContatoMensagemErro: ''};
        case  ADICIONA_CONTATO_ERRO:
            return {...state, adicionaContatoMensagemErro: action.payload, adicionaContatoMensagemSucesso: ''};
        case MODIFICA_CAMPO_MENSAGEM:
            return {...state, mensagem: action.payload }
        case ENVIO_MENSAGEM:
            return {...state, mensagem: '' }
        default: 
            return {...state};
    }  
}
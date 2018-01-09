import {
    LISTA_CONTATO_USARIO,
    MODIFICA_NOME_CONTATO_CONVERSA_ATUAL
} from '../types/AppTypes';

INITIAL_STATE = {
    arrayContatos: [],
    nomeContatoConversaAtual: ''
};

export default (state = INITIAL_STATE, action) => { 
    switch(action.type){
        case LISTA_CONTATO_USARIO:
            return {...state, arrayContatos: action.payload };
        case MODIFICA_NOME_CONTATO_CONVERSA_ATUAL:
            console.log(action.payload)
            return {...state, nomeContatoConversaAtual: action.payload }
        default: 
            return state;
    }
}
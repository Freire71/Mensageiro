import {
    LISTA_CONVERSA_USUARIO,
} from '../types/AppTypes';
const INITIAL_STATE = {
    conversa: [{mensagem:''}],
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case LISTA_CONVERSA_USUARIO:
            return {...state, conversa: action.payload, loading: true }
        case 'loading_false':{
            return{...state, loading: false}
        }
        default:
            return {...state};
    }
}
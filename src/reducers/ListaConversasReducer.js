import { LISTA_CONVERSAS } from '../types/AppTypes';


const INITIAL_STATE = {
    conversas: [
        {
            nome: '',
            email: '',
            ultimaMensagem: ''
        }
    ]
}

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case LISTA_CONVERSAS: 
            return {...state, conversas: action.payload}
        default: 
            return {...state};
    }
}
import {
    MODIFICA_EMAIL_CADASTRO,
    MODIFICA_NOME_CADASTRO,
    MODIFICA_SENHA_CADASTRO,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOADING_CADASTRO
} from '../types/CadastroTypes'

const INITIAL_STATE = {
    nome: '',
    senha: '',
    email: '',
    erroCadastro: '',
    loadingCadastro: false
}

export default (state= INITIAL_STATE, action ) => {
    switch(action.type) {
        case MODIFICA_EMAIL_CADASTRO:
        return {...state, email: action.payload }
    
        case MODIFICA_SENHA_CADASTRO:
            return {...state, senha: action.payload }

        case MODIFICA_NOME_CADASTRO:
            return {...state, nome: action.payload }

        case CADASTRO_USUARIO_ERRO:
            return {...state, erroCadastro: action.payload, loadingCadastro: false }

        case CADASTRO_USUARIO_SUCESSO:{
            return {...INITIAL_STATE }
        }
        case LOADING_CADASTRO:
            return{...state, loadingCadastro: true }

            default: return state;
    }
}
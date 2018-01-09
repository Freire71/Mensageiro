import { 
    MODIFICA_EMAIL, 
    MODIFICA_SENHA, 
    AUTENTICAO_USUARIO_SUCESSO, 
    AUTENTICAO_USUARIO_ERRO,
    LOADING_LOGIN,
} from '../types/AutenticacaoTypes';
import { LOGOUT }  from '../types/AppTypes';

const INITIAL_STATE ={
    email: '',
    senha: '',
    erroLogin: '',
    loadingLogin: false
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOADING_LOGIN:
            console.log(state.loadingLogin)
            return {...state, loadingLogin: true}

        case MODIFICA_EMAIL:
            return {...state, email: action.payload }
        
        case MODIFICA_SENHA:
            return {...state, senha: action.payload }

        case AUTENTICAO_USUARIO_ERRO:
            return {...state, erroLogin: 'E-mail ou senha inválidos', loadingLogin: false }
        
        case AUTENTICAO_USUARIO_SUCESSO:
            return {...state, loadingLogin: false };
        case LOGOUT: {
            console.log('entrei no reducer certo')
            return {...INITIAL_STATE}
        }

        default: return state;
    }
}
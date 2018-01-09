import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    MODIFICA_EMAIL, 
    MODIFICA_SENHA, 
    AUTENTICAO_USUARIO_SUCESSO, 
    AUTENTICAO_USUARIO_ERRO,
    LOADING_LOGIN
} from '../types/AutenticacaoTypes';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const loadingLogin = (dispatch) => {
    dispatch({type: LOADING_LOGIN })
}

export const autenticacaoUsuario = (login, senha) => {
    return dispatch => {
        dispatch({ type: LOADING_LOGIN })
        firebase.auth().signInWithEmailAndPassword(login,senha)
            .then( () => {
                Actions.principal();
                return( dispatch({ type: AUTENTICAO_USUARIO_SUCESSO }))
            })
            .catch( () => { dispatch({ type:  AUTENTICAO_USUARIO_ERRO })})
        }
}

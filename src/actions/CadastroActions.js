import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import {
    MODIFICA_EMAIL_CADASTRO,
    MODIFICA_NOME_CADASTRO,
    MODIFICA_SENHA_CADASTRO,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOADING_CADASTRO
} from '../types/CadastroTypes'

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL_CADASTRO,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME_CADASTRO,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA_CADASTRO,
        payload: texto
    }
}

export const cadastraUsuario = (nome, email, senha) => {
    return dispatch => {
        dispatch({  type: LOADING_CADASTRO  })
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then( () => cadastroSucesso(dispatch,nome,email))
            .catch(erro => cadastroErro(erro, dispatch));
    }
   
}

const cadastroSucesso = (dispatch,nome,email) => {
    let emailB64 = b64.encode(email);
    firebase.database().ref(`/contatos/${emailB64}` )
        .set({ nome })
        .then( 
            Actions.boasvindas(),
            dispatch({ type: CADASTRO_USUARIO_SUCESSO })
        )
    
}

const cadastroErro = (erro, dispatch) => {
    let mensagem;
    switch(erro.code){
        case 'auth/email-already-in-use':
            mensagem = 'O email digitado já está cadastrado.';
            break;
        case 'auth/invalid-email':
            mensagem = 'Digite um email válido';
            break;
        case 'auth/operation-not-allowed':
            mensagem = 'Operação não permitida';
            break;
        case 'auth/weak-password':
            mensagem = 'A senha deve possuir no mínimo 6 caracteres';
            break;
        default: return mensagem;
    }
    console.log(mensagem);
    dispatch({ type: CADASTRO_USUARIO_ERRO , payload: mensagem })
}
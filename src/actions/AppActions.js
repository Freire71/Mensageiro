import firebase from 'firebase';
import b64 from 'base-64';
import _ from 'lodash';
import moment from 'moment';
require('moment/locale/pt-br.js');
moment.locale('pt-br');

import { Actions } from 'react-native-router-flux';


import {
    MODIFICA_CONTATO_EMAIL,
    ADICIONA_CONTATO_SUCESSO,
    ADICIONA_CONTATO_ERRO,
    LISTA_CONTATO_USARIO,
    MODIFICA_NOME_CONTATO_CONVERSA_ATUAL,
    MODIFICA_CAMPO_MENSAGEM,
    ENVIO_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    LISTA_CONVERSAS,
    LOGOUT
} from '../types/AppTypes';

export const modificaContatoEmail = (texto) => {
    return {
        type: MODIFICA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContatoFireBase = (email) => {
   return dispatch => {
        const emailB64 = b64.encode(email)
        let payload = '';
        firebase.database().ref(`/contatos/${emailB64}`)
            .once('value')
            .then( snapshot => {
                if(snapshot.val()){
                    const nomeContato = snapshot.val().nome;
                    console.log(nomeContato);
                    console.log(snapshot.val());
                    const usuarioLogadoB64 = b64.encode(firebase.auth().currentUser.email);
                    firebase.database().ref(`/usuario_contatos/${usuarioLogadoB64}`)
                        .push({
                            email,
                            nome: nomeContato

                        })
                        .then( () => {
                            payload = 'Usuário adicionado com sucesso!';
                            dispatch({ type: ADICIONA_CONTATO_SUCESSO, payload })
                        })
                        .catch(() => {
                            payload = 'Não foi possível estabelecer conexão com o servidor!';
                            dispatch({ type: ADICIONA_CONTATO_ERRO, payload })
                        })
                    
                    
                } else {
                    payload = 'Usuário inexistente!';
                    dispatch({ type: ADICIONA_CONTATO_ERRO, payload });
                }
            })
        
            
    }
    
}

export const modificaNomeContato = (nome) => {
    Actions.conversa();
    return {
        type: MODIFICA_NOME_CONTATO_CONVERSA_ATUAL,
        payload: nome
    }
}

export const contatosUsuarioFetch = () => {
    const usuarioAtual = firebase.auth().currentUser

    return (dispatch) => {
        const usuarioEmailB64 = b64.encode(usuarioAtual.email);
        firebase.database().ref(`/usuario_contatos/${usuarioEmailB64}`)
            .on("value", snapshot => {
                const arrayContatos = _.map(snapshot.val(), (val) => {
                    return {...val}
                })
                dispatch(
                    {
                        type: LISTA_CONTATO_USARIO,
                        payload: arrayContatos
                    }
                )
            })
    }
}

export const modificaCampoMensagem = (texto) => {
    return {
        type: MODIFICA_CAMPO_MENSAGEM,
        payload: texto
    }
}

export const enviaMensagem = (mensagem, nomeContato, emailContato) => {
    return dispatch => {
        dispatch({type: ENVIO_MENSAGEM});
        const usuarioAtual = firebase.auth().currentUser.email;
        const usuarioAtual64 = b64.encode(usuarioAtual);
        const usuarioContato = b64.encode(emailContato);
        const chave = Math.random().toString(36).substring(2);
        data = moment().format('LL')
        let horario = new Date();
        const hora = horario.getHours();
        let minutos = horario.getMinutes();
        if(minutos >= 0 && minutos <=9){
            minutos= `0${minutos}`
        }
        horario = `${hora}:${minutos}`;
        let nomeUsuarioAtual = '';
        firebase.database().ref(`/contatos/${usuarioAtual64}`).once('value')
            .then(snapshot => {
                nomeUsuarioAtual = snapshot.val().nome;
            })
        
        firebase.database().ref(`/mensagens/${usuarioAtual64}/${usuarioContato}`).push({
            mensagem,
            tipo: 'e',
            data,
            lido: true,
            horario,
            chave
        }).then(() => {
            firebase.database().ref(`/mensagens/${usuarioContato}/${usuarioAtual64}`).push({
                mensagem,
                tipo: 'r',
                data,
                lido: false,
                horario,
                chave
            })
        }).then(()=> {
            firebase.database().ref(`/usuario_conversas/${usuarioAtual64}/${usuarioContato}`).set({
                nome: nomeContato, email: emailContato, ultimaMensagem: mensagem
            })
        }).then( () => {
            firebase.database().ref(`/usuario_conversas/${usuarioContato}/${usuarioAtual64}`).set({
                nome: nomeUsuarioAtual , email: usuarioAtual, ultimaMensagem: mensagem
            })
        })
    }
}

export const conversaUsuarioFetch = emailContato => {
    const usuarioEmailB64 = b64.encode(firebase.auth().currentUser.email);
    const emailContatoB64 = b64.encode(emailContato);

    return dispatch => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${emailContatoB64}`)
        .on('value', snapshot => {
            dispatch({type:LISTA_CONVERSA_USUARIO, payload: _.values(snapshot.val()) })
        })
    }
}

export const setaLoadingFalse = () => {
    return {
        type: 'loading_false'
    }
}

export const carregaConversas = () => {
    return dispatch => {
        const usuarioEmailB64 = b64.encode(firebase.auth().currentUser.email);
        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`).on('value', snapshot => {
            dispatch({ type: LISTA_CONVERSAS, payload: _.values(snapshot.val())})
        })
            
    }
}
export const encerraSessao= () => {
    firebase.auth().signOut();
    Actions.login();
    return {
        type: LOGOUT
    }
}
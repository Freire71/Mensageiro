import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Button, StatusBar} from 'react-native';
import { Actions }from 'react-native-router-flux'


export default class BoasVindas extends  Component {
    render(){
        return(
            <ImageBackground style={{ flex:1  }} source={require('../imgs/bg5.png')} >
                <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                    <StatusBar backgroundColor='#1565C0' />
                    <View style={{ flex:1, marginTop: 60 }}>
                        <Image source={require('../imgs/enviar2.png')}/>
                    </View>
                    <View style={{flex:2, marginTop: 40}}> 
                        <Text style={{ color:'black', fontSize: 22, marginBottom: 60}}>Usuário Cadastrado com Sucesso!</Text>
                        <Button title='Continuar' color='#1565C0' onPress={() => Actions.login()} />
                    </View>
                </View>
            </ImageBackground>
        
        )
    }
}
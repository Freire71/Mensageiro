import React, { Component }from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

const img = require('../imgs/mais2.png')
export default class YourComponent extends Component{
    _render(){
        return(
            this.teste.open()
        )
    }
    render(){
        return(
            <View>
            <Text>Hello world!</Text>
            <Menu ref={(ref) => { this.teste = ref; }}>
                <MenuTrigger olá/>
                <MenuOptions>
                <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                <MenuOption onSelect={() => alert(`Delete`)} >
                    <Text style={{color: 'red'}}>Sair</Text>
                </MenuOption>
                <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
                </MenuOptions>
            </Menu>
            <TouchableHighlight
                onPress={() => this._render()}
            >
                <Image source={img} />
            </TouchableHighlight>
         
          </View>
        )
    }
}
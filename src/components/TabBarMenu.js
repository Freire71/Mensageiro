import React, { Component } from 'react'
import { View , Text, StatusBar, Image, TouchableHighlight,Picker } from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { encerraSessao } from '../actions/AppActions';
import { connect } from 'react-redux'
 
 class TabBarMenu extends Component {
    logOut(){
        this.props.encerraSessao();
    }
    
    render(){
        return(
            <View style={{ elevation: 10, height: 100 }}>
                <StatusBar 
                    backgroundColor='#1254a1'
                />
                <View style={{height:50, backgroundColor:'#1565C0', alignItems: 'center', flexDirection:'row',flex:1 }}>
                    <Text style={{ color: 'white', fontSize:20, marginLeft:15, fontWeight:'bold' }}>Mensageiro</Text>
                    <View style={{ flexDirection:'row', justifyContent:'flex-end' , flex:1, marginRight: 18}}>
                        <TouchableHighlight
                            onPress={() => Actions.adicionarContato()}
                            underlayColor='#1565C0'
                        >
                            <Image source={require('../imgs/adicionar-contato.png')} />
                        </TouchableHighlight>
                        <View style={{margin:10}} ></View>
                        <Menu style={{elevation:12}}ref={(ref) => { this.menu = ref; }}>
                            <MenuTrigger/>
                            <MenuOptions>
                            <MenuOption onSelect={() => alert(`Ainda a implementar`)} >
                                <Text style={{color: 'black', fontSize: 20}}>Perfil</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => this.logOut()} >
                                <Text style={{color: 'red', fontSize: 20}}>Sair</Text>
                            </MenuOption>
                            </MenuOptions>
                        </Menu>
                        <TouchableHighlight
                            onPress={() => this.menu.open()}
                            underlayColor='#1565C0'
                        >
                            <Image source={require('../imgs/mais2.png')} />
                        </TouchableHighlight>
                    </View>
                    

                </View>
                    
            
                <TabBar {...this.props} style={{backgroundColor: '#1565C0', elevation: 0  }} labelStyle={{fontWeight:'bold'}} />
            </View>
        )
    }
}

export default connect(null, { encerraSessao })(TabBarMenu)
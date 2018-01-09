import _ from 'lodash';
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { View, Text, TextInput, ImageBackground, FlatList, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import {
    contatosUsuarioFetch,
    modificaNomeContato
} from '../actions/AppActions';

const imagemContato = require('../imgs/usuario1.png');


class Contatos extends Component {

    constructor(props){
        super(props);

    }

    componentWillMount(){
        this.props.contatosUsuarioFetch();
    }
    componentWillReceiveProps(nextProps){

    }

    renderRow(item){
        return (
                <TouchableHighlight
                    //onPress={() => {this.props.modificaNomeContato(item.nome)}}
                    onPress={() => Actions.conversa({title:item.nome ,nomeContato: item.nome, emailContato: item.email})}
                    underlayColor='white' 
                >
                    <View style={{flex: 1, backgroundColor:'white', marginLeft: 10, flexDirection:'row', borderBottomWidth:0.3, borderColor:'grey', alignItems:'center'}}>
                            <Image source={imagemContato} />
                            <View style={{flexDirection:'column', margin: 10}}>
                                <Text style={{fontSize:22, color:'black'}}>{item.nome}</Text>
                                <Text style={{fontSize:15}}>{item.email}</Text>
                            </View>
                        
                    </View>     
                </TouchableHighlight>
            )
    }

    render(){
        return (
            <View style={{backgroundColor:'white', flex:1, paddingTop: 10 }}>
                <FlatList 
                    data={this.props.listaContato}
                    renderItem={({item}) => { return (this.renderRow(item) )}}
                />
            </View>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        listaContato: state.ListaContatosReducer.arrayContatos
    }
}

export default connect(mapStateToProps, { contatosUsuarioFetch,modificaNomeContato })(Contatos);
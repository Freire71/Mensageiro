import React, { Component } from 'react'
import { View, Text, Picker, FlatList, TouchableHighlight, Image} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { carregaConversas } from '../actions/AppActions'

const imagemContato = require('../imgs/usuario1.png');

class Conversas extends Component {
    
    componentWillMount(){
        this.props.carregaConversas();
    }
    _renderRow(item){
        return(
            <TouchableHighlight
                onPress={() => Actions.conversa({title:item.nome ,nomeContato: item.nome, emailContato: item.email})}
                underlayColor='white' 
            >
            <View style={{marginLeft: 10,flex:1,flexDirection:'row', backgroundColor:'white', borderBottomWidth:0.3, borderColor:'grey', alignItems:'center'}}>
                <Image source={imagemContato}/>
                <View style={{flexDirection:'column', margin: 10}}>
                    <Text style={{fontSize:22, color:'black'}}>{item.nome}</Text>
                    <Text style={{fontSize:15}}>{item.ultimaMensagem}</Text>
                </View>
            </View>
            </TouchableHighlight>
            
        )
    }
    
    render(){
        return (
            <View style={{flex:1,paddingTop: 10, backgroundColor: 'white'}}>
                <FlatList
                    data={this.props.listaConversas}
                    renderItem={({item}) => this._renderRow(item)}
                />
            </View>
        )
    }

}

const mapStateToProps = state => {
    return {
        listaConversas: state.ListaConversasReducer.conversas
    }
}

export default connect(mapStateToProps, { carregaConversas })(Conversas);
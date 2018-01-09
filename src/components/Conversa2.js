import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableHighlight, ImageBackground, StatusBar, FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { modificaCampoMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppActions'

class Conversa2 extends Component {
    componentWillMount(){
        this.props.conversaUsuarioFetch(this.props.emailContato)
        console.log(this.props);
    }
    componentWillReceiveProps(nextProps){

    }
    componentDidMount(){
        this.flatlist.scrollToEnd()
    }

    renderRow(item){
        return(
            <View>
                <Text style={{fontSize: 18, color: 'black'}}>{item.mensagem}</Text>
            </View>
        )
    }

    _enviaMensagem(){
        const { mensagem, nomeContato, emailContato } = this.props;
        this.props.enviaMensagem(mensagem, nomeContato, emailContato )
        this.props.conversaUsuarioFetch(emailContato);
        this.flatlist.scrollToEnd()
    }
    render(){
            return(
            <ImageBackground style={{ flex:1}} source={require('../imgs/bg5.png')} >
                    <StatusBar backgroundColor='#1254a1' />
                    <View style={{flex:1}}>
                        <FlatList
                        ref={(ref) => { this.flatlist = ref; }}
                            data={this.props.conversa}
                            renderItem={({item}) => { console.log(item); return (this.renderRow(item) )}}
                            getItemLayout={(data, index) => (
                                {length: 60, offset: 60 * index, index}
                            )}
                        />
                    </View>
                    <View style={{  padding: 10, }}>
                        <View style={{ flexDirection:'row', alignItems:'center'}}>
                            <TextInput
                                value={this.props.mensagem}
                                onChangeText={texto => this.props.modificaCampoMensagem(texto) }
                                multiline={true}
                                style={{flex: 4, backgroundColor:'white', fontSize:18,height:50}}
                                placeholder='Digite aqui...'
                                autoGrow={true}
                                maxHeight={80}
                                onFocus={( () => this.flatlist.scrollToEnd())}
                            />
                            <TouchableHighlight
                                onPress={ () => this._enviaMensagem() }
                                underlayColor='white'
                            >
                                <Image source={require('../imgs/enviar.png')} />
                            </TouchableHighlight>
                        </View>
                    </View>
            </ImageBackground>
            
            
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        //nomeContato: state.ListaContatosReducer.nomeContatoConversaAtual,
        mensagem: state.AppReducer.mensagem,
        conversa: state.ListaConversaReducer.conversa
    }
}

export default connect(mapStateToProps, { modificaCampoMensagem, enviaMensagem, conversaUsuarioFetch } )(Conversa)
import React, { Component } from 'react';
import { Text, View, TextInput, Image, TouchableHighlight, ImageBackground, StatusBar,StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { modificaCampoMensagem, enviaMensagem, conversaUsuarioFetch, setaLoadingFalse } from '../actions/AppActions'
import { KeyboardAwareFlatList  } from 'react-native-keyboard-aware-scroll-view'

class Conversa extends Component {
    
    componentWillMount(){
        this.props.conversaUsuarioFetch(this.props.emailContato)
        console.log(this.props);
    }
 
    renderRow(item){
        if(item.tipo=='e'){
            return(
                <View style={{justifyContent :'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 90, marginRight: 15, flexDirection:'row'}}>
                    <Text style={styles.mensagemEnviada}>{item.mensagem}</Text>
                    <Text style={styles.mensagemEnviadaHorario}>{item.horario}</Text>
                </View>
            )
        }
        return(
            <View style={{justifyContent:'flex-start', marginTop: 5, marginBottom: 5, marginRight: 90, marginLeft:15, flexDirection:'row'}}>
                <Text style={styles.mensagemRecebida}>{item.mensagem}</Text>
                <Text style={styles.mensagemRecebidaHorario}>{item.horario}</Text>
                
            </View>
        )
    }
   
    _enviaMensagem(){
        const { mensagem, nomeContato, emailContato } = this.props;
        this.props.enviaMensagem(mensagem, nomeContato, emailContato )
        this.props.conversaUsuarioFetch(emailContato);
        this.textinput.clear();
    }
    render(){
            return(
            <ImageBackground style={{ flex:1 }} source={require('../imgs/bg5.png')} >
                    <StatusBar backgroundColor='#1254a1' />
                        <FlatList
                            ref={(ref) => { this.flatlist = ref; }}
                            data={this.props.conversa}
                            renderItem={({item}) => { return (this.renderRow(item) )}}
                             getItemLayout={(data, index) => (
                                {length: 60, offset: 60 * index, index}
                          )}
                          style={{flex:1}}
                        />
                    <View style={{ flexDirection:'row', alignItems:'center', marginHorizontal: 10, marginBottom: 5}}>
                            <TextInput
                                ref={(ref) => { this.textinput = ref; }}
                                value={this.props.mensagem}
                                onChangeText={texto => this.props.modificaCampoMensagem(texto) }
                                multiline={true}
                                style={{flex: 4, backgroundColor:'white', fontSize:18,height:50}}
                                placeholder='Digite aqui...'
                                autoGrow={true}
                                maxHeight={80}
                            />
                            <TouchableHighlight
                                onPress={ () => this._enviaMensagem() }
                                underlayColor='white'
                            >
                                <Image source={require('../imgs/enviar.png')} />
                            </TouchableHighlight>
                    </View>
            </ImageBackground>
            
            
        )
    }
}

const styles = StyleSheet.create({
    mensagemEnviada:{
        fontSize: 18, 
        color: 'black', 
        padding:6, 
        backgroundColor:'#cce6ff',
        borderColor:'#cce6ff',
        elevation:1,
        borderRadius: 5,
        borderLeftWidth:10,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginRight: -7
    },
    mensagemRecebida: {
        fontSize: 18, 
        color: 'black', 
        padding:6,
        backgroundColor:'#fff', 
        borderColor:'#fff',
        elevation:1,
        borderRadius: 5,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 10,
        borderRightWidth: 0,
        marginRight: -7

    },
    mensagemEnviadaHorario:{
        fontSize: 12,
        backgroundColor:'#cce6ff',
        borderColor:'#cce6ff',
        paddingTop:10,
        paddingBottom:10,
        elevation:1,
        alignSelf :'flex-end',
        borderRadius: 5,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 10,
    },
    mensagemRecebidaHorario:{
        fontSize: 12,
        backgroundColor:'#ffffff',
        borderColor:'#fff',
        paddingTop:10,
        paddingBottom:10,
        elevation:1,
        alignSelf :'flex-end',
        borderRadius: 5,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 10,
    }
})


const mapStateToProps = state => {
    return {
        //nomeContato: state.ListaContatosReducer.nomeContatoConversaAtual,
        mensagem: state.AppReducer.mensagem,
        conversa: state.ListaConversaReducer.conversa,
        loading: state.ListaConversaReducer.loading
    }
}

export default connect(mapStateToProps, { 
    modificaCampoMensagem, 
    enviaMensagem, 
    conversaUsuarioFetch, 
    setaLoadingFalse } )(Conversa)
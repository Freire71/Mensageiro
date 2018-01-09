import React, { Component } from 'react'
import { View, Text, TextInput, Button,ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { modificaContatoEmail, adicionaContatoFireBase } from '../actions/AppActions';

class AdicionaContato extends Component {
    render(){
        return (
            <ImageBackground style={{flex:1}} source={require('../imgs/bg5.png')} >
                <View style={{margin: 10, marginTop: 100, justifyContent: 'center'}} >
                    <View style={{marginBottom: 15}}>
                        <Text style={{color:'red', fontSize:20, textAlign: 'center'}}>{this.props.mensagemErro}</Text>
                        <Text style={{color:'green', fontSize:20, textAlign: 'center'}}>{this.props.mensagemSucesso}</Text>
                    </View>
                    <TextInput 
                        placeholder='E-mail'
                        style={{fontSize:20, height: 45 }}
                        value={this.props.contatoEmail}
                        onChangeText={(texto) => this.props.modificaContatoEmail(texto) }
                    />
                    <View style={{margin: 15}}></View>
                    <Button 
                        title='Adicionar Contato'
                        onPress={ () => this.props.adicionaContatoFireBase(this.props.contatoEmail)}
                        
                        color='#1565C0'
                    />
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => (
    {
        contatoEmail: state.AppReducer.adicionaContatoEmail,
        mensagemSucesso: state.AppReducer.adicionaContatoMensagemSucesso,
        mensagemErro: state.AppReducer.adicionaContatoMensagemErro,
    }
)
export default connect(mapStateToProps, { modificaContatoEmail, adicionaContatoFireBase })(AdicionaContato)

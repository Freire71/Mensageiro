import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Button,
    TouchableHighlight,
    ImageBackground,
    StatusBar,
    ActivityIndicator
} from 'react-native';


import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticacaoUsuario } from '../actions/AutenticacaoActions';
 
class FormLogin extends Component {

    _autenticacaoUsuario(){
        const email = this.props.email;
        const senha = this.props.senha;
        this.props.autenticacaoUsuario(email,senha);
    }

    renderBtnAcessar(){
        if(this.props.loadingLogin){
            return(
                <ActivityIndicator size='large' />
            )
        }
        return(
            <Button 
                title='Entrar'
                onPress={() => this._autenticacaoUsuario()}
                color='#1565C0'
            />
        )
    }

    render(){
        return(
            <ImageBackground style={{ flex:1}} source={require('../imgs/bg5.png')} >
                <StatusBar backgroundColor='#1254a1' />
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, color: 'black',}} >Mensageiro</Text>
                    </View>
                    <View style={{ flex: 2 }} >
                        <Text style={{ fontSize:20, color:'red', textAlign:'center', marginBottom:10}}>{this.props.erroLogin}</Text>
                        <TextInput
                            style={{ fontSize: 20, height: 45, }}
                            placeholder='E-mail'
                            value={this.props.email}
                            placeholderTextColor='black'
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />
                        <TextInput 
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Senha'
                            value={this.props.senha}
                            secureTextEntry
                            onChangeText={ texto => this.props.modificaSenha(texto)}
                            placeholderTextColor='black'
                        />
                        <TouchableHighlight 
                            style={{ marginTop: 10 }} 
                            onPress={() => Actions.cadastro()}
                            underlayColor='#e6e6e6' 
                        >
                            <Text style={{ fontSize: 20, color:'black' }} >Ainda não tem cadastro? Cadastra-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 2, marginTop: 120 }} >
                    {this.renderBtnAcessar()}                        
                    </View>
                </View>
            </ImageBackground>
        );
    }
} 
const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loadingLogin: state.AutenticacaoReducer.loadingLogin
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticacaoUsuario })(FormLogin);
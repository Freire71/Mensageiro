import React, { Component } from 'react';
import { View, TextInput, Button, Text, ImageBackground, StatusBar, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/CadastroActions';


class FormCadastro extends Component {
    

    renderBtnCadastrar(){
        if(this.props.loadingCadastro){
            return(
                <ActivityIndicator 
                    size='large'
                />
            )
        }
        return(
            <Button 
                title='Cadastrar'
                onPress={() => this._cadastraUsuario()}
                color='#1565C0'
            />
        )
    }
    _cadastraUsuario(){
        const email = this.props.email;
        const senha = this.props.senha;
        const nome = this.props.nome;
        this.props.cadastraUsuario(nome,email,senha);
    }
    render(){
        return(
            <ImageBackground style={{ flex:1  }} source={require('../imgs/bg5.png')} >
                <StatusBar backgroundColor='#1254a1' />
                <View style={{ padding: 10, flex: 1 }} >
                <View style={{ flex: 4, justifyContent: 'center' }}>
                <Text style={{ marginBottom:20, color:'red', fontSize: 18, textAlign:'center' }}>{this.props.erroCadastro}</Text>
                    <TextInput 
                        placeholder='Nome'
                        style={{ fontSize: 20, height: 45 }}
                        value={this.props.nome}
                        onChangeText={ texto => this.props.modificaNome(texto) }
                        placeholderTextColor='black'
                    />
                    <TextInput 
                        placeholder='E-mail'
                        style={{ fontSize: 20, height: 45 }}
                        value={this.props.email}
                        onChangeText={ texto => this.props.modificaEmail(texto) }
                        placeholderTextColor='black'
                    />
                    <TextInput 
                        placeholder='Senha'
                        style={{ fontSize: 20, height: 45 }}
                        value={this.props.senha}
                        secureTextEntry
                        onChangeText={ texto => this.props.modificaSenha(texto) }
                        placeholderTextColor='black'
                    />
                </View>
                <View style={{ flex: 1 }}>
                  {this.renderBtnCadastrar()}
                </View>
            </View>
        </ImageBackground>
        )
    }
}

const mapStateToProps = state => (
    {
        nome: state.CadastroReducer.nome,
        email: state.CadastroReducer.email,
        senha: state.CadastroReducer.senha,
        erroCadastro: state.CadastroReducer.erroCadastro,
        loadingCadastro: state.CadastroReducer.loadingCadastro
    }
)

export default connect(mapStateToProps, 
    { 
        modificaEmail, 
        modificaNome, 
        modificaSenha, 
        cadastraUsuario,
        
    })(FormCadastro);
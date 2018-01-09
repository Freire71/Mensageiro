import React from 'React';
import { Router, Stack, Scene } from 'react-native-router-flux'
import FormLogin from './components/FormLogin.js';
import FormCadastro from './components/FormCadastro.js';
import BoasVindas from './components/BoasVindas.js';
import Principal from './components/Principal.js';
import AdicionaContato from './components/AdicionaContato';
import Conversa from './components/Conversa';
import teste2 from './components/teste2';
import teste3 from './components/teste3';

export default props => (


    <Router >
        <Stack key='root'>
          
            <Scene 
                key='login' 
                component={FormLogin} 
                title='Login' 
                navigationBarStyle={{ backgroundColor:'#1565C0' }} 
                titleStyle={{ color:'white', alignSelf: 'center'}} 
                navBarButtonColor='white' 
                left={() => null}
                //hideNavBar={true}
            />
            <Scene 
                key='cadastro' 
                component={FormCadastro} 
                title='Cadastro' 
                navigationBarStyle={{ backgroundColor:'#1565C0' }} 
                titleStyle={{ color:'white'}} 
                navBarButtonColor='white'
            />
            <Scene 
                key='boasvindas'
                component={BoasVindas}
                title='Bem-Vindo'
                navigationBarStyle={{ backgroundColor:'#1565C0'}}
                titleStyle={{ color:'white'}}
                left={() => null}
                hideNavBar={true}
            />
            <Scene 
                key='principal'
                component={Principal}
                title='Teste'
                navigationBarStyle={{ backgroundColor:'#1565C0'}}
                titleStyle={{ color:'white' }}
                left={() => null}
                hideNavBar={true}
            />
            <Scene 
                key='adicionarContato'
                component={AdicionaContato}
                title='Novo Contato'
                navigationBarStyle={{ backgroundColor:'#1565C0'}}
                titleStyle={{ color:'white' }}
                navBarButtonColor='white'
            />
            <Scene 
                key='conversa'
                component={Conversa}
                title=''
                navigationBarStyle={{ backgroundColor:'#1565C0'}}
                titleStyle={{ color:'white' }}
                navBarButtonColor='white'
            />
            <Scene 
                key='teste2'
                component={teste2}
                title=''
                navigationBarStyle={{ backgroundColor:'#1565C0'}}
                titleStyle={{ color:'white' }}
                navBarButtonColor='white'
                //initial
            />
            <Scene 
                key='teste3'
                component={teste3}
                title=''
                navigationBarStyle={{ backgroundColor:'#1565C0'}}
                titleStyle={{ color:'white' }}
                navBarButtonColor='white'
                //initial
            />
        </Stack>
    </Router>

);
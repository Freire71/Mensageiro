import React, { Component } from 'react';
import {
  Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers/';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { MenuProvider } from 'react-native-popup-menu';

import Routes from './src/Routes';

export default class App extends Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyDvImEBHwQnGWKVmosYG-F94KsbWUvOUDg",
      authDomain: "menssageiro-c5488.firebaseapp.com",
      databaseURL: "https://menssageiro-c5488.firebaseio.com",
      projectId: "menssageiro-c5488",
      storageBucket: "menssageiro-c5488.appspot.com",
      messagingSenderId: "249516689109"
    };
    return firebase.initializeApp(config);
  }

  render() {
    return (
      <MenuProvider>
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
          <Routes />
        </Provider>
      </MenuProvider>
    );
  }
}
console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Setting a timer'
]


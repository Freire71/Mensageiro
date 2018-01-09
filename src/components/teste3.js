import React from 'react';
import { View, TextInput, Image, KeyboardAvoidingView } from 'react-native';

import logo from '../imgs/enviar2.png';

const Demo = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
    >
      <Image source={logo}  />
      <TextInput
        placeholder="Email"
      />
      <TextInput
        placeholder="Username"
      />
      <TextInput
        placeholder="Password"
      />
      <TextInput
        placeholder="Confirm Password"
      />
      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
  );
};

export default Demo;
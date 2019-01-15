import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import RegisterPage from './application/src/pages/RegisterPage'; 

export default class App extends Component {
  render() {
    return (
      <View>
        <RegisterPage />
      </View>
    );
  }
}

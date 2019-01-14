import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import LoginPage from './application/src/pages/LoginPage'; 

export default class App extends Component {
  render() {
    return (
      <View>
        <LoginPage />
      </View>
    );
  }
}

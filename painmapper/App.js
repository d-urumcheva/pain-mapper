import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';
import ForgotPassPage from './application/src/pages/ForgotPassPage'; 

export default class App extends Component {
  render() {
    return (
      <View>
        <ForgotPassPage />
      </View>
    );
  }
}

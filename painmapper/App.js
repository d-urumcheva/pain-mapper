console.disableYellowBox = ["Unable to symbolicate"];

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginPage from './application/src/pages/LoginPage';
import RegisterPage from './application/src/pages/RegisterPage';
import ForgotPassPage from './application/src/pages/ForgotPassPage';

class App extends Component {
  render() {
    return (
      <View>
        <AppContainer />
      </View>
    );
  }
}

const AppStackNavigator = createStackNavigator(
  {
    LoginPage: LoginPage, 
    RegisterPage: RegisterPage, 
    ForgotPassPage: ForgotPassPage
  }, 
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'steelblue'
      } 
    }
  }
)

export default AppContainer = createAppContainer(AppStackNavigator);

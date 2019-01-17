console.disableYellowBox = ["Unable to symbolicate"];

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text} from 'react-native';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginPage from './application/src/pages/LoginPage';
import RegisterPage from './application/src/pages/RegisterPage';
import ForgotPassPage from './application/src/pages/ForgotPassPage';
import HomePage from './application/src/pages/HomePage';
import SettingsPage from './application/src/pages/SettingsPage';
import PersonalDetailsPage from './application/src/pages/PersonalDetailsPage';
import AssetsPage from './application/src/pages/AssetsPage';

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
    SettingsPage: SettingsPage,
    AssetsPage: AssetsPage,
    HomePage: HomePage,
    LoginPage: LoginPage, 
    RegisterPage: RegisterPage, 
    ForgotPassPage: ForgotPassPage,
    PersonalDetailsPage: PersonalDetailsPage,
    
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

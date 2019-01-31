console.disableYellowBox = ["Unable to symbolicate"];

import React, { Component } from 'react';
import { View, } from 'react-native';
import Icon from 'react-native-ionicons';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

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

const LoginStackNavigator = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        header: null, 
      }
    },
    RegisterPage: {
      screen: RegisterPage,
      navigationOptions: {
        header: null, 
      }
    },
    ForgotPassPage: ForgotPassPage
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'steelblue'
      }
    }
  })

const SettingsStackNavigation = createStackNavigator( 
  {
    SettingsPage: SettingsPage,
    PersonalDetailsPage: PersonalDetailsPage, 
    AssetsPage: AssetsPage
  }
)

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {screen: HomePage},
    Settings: {
      screen: SettingsStackNavigation
    }
  },
  {
    navigationOptions: {
      header: null,
    }
  }
)

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  }
)

const AppSwitchNavigator = createSwitchNavigator(
  {
    LoginPage: LoginStackNavigator,
    Dashboard: { screen: DashboardStackNavigator }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'steelblue'
      }
    }
  }
)

export default AppContainer = createAppContainer(AppSwitchNavigator);

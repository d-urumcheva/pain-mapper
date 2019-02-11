import React, { Component } from 'react';
import { View, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
} from 'react-navigation';

import LoginPage from './application/src/pages/LoginPage';
import RegisterPage from './application/src/pages/RegisterPage';
import ForgotPassPage from './application/src/pages/ForgotPassPage';
import HomePage from './application/src/pages/HomePage';
import SettingsPage from './application/src/pages/SettingsPage';
import PersonalDetailsPage from './application/src/pages/PersonalDetailsPage';
import AssetsPage from './application/src/pages/AssetsPage';
import LoadingPage from './application/src/pages/LoadingPage';
import SleepPage from './application/src/assetPages/SleepPage';
import WeatherPage from './application/src/assetPages/WeatherPage';
import MoodDailyView from './application/src/assetComponents/MoodDailyView';
import MoodWeeklyView from './application/src/assetComponents/MoodWeeklyView';

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

  const MoodTabNavigator = createMaterialTopTabNavigator(
    {
      Daily: {
        screen: MoodDailyView,
        navigationOptions: {
          header: null, 
        }
      }, 
      Weekly: {
        screen: MoodWeeklyView, 
        navigationOptions: {
          header: null, 
        }
      },
      Monthly: {
        screen: MoodDailyView, 
        navigationOptions: {
          header: null, 
        }
      }
    }, 
    {
      swipeEnabled: false
    }
  )

  MoodTabNavigator.navigationOptions = {
    header: null,
  };

const HomeStackNavigator = createStackNavigator(
  {
  HomePage: HomePage,
  MoodPage: {
    screen: MoodTabNavigator
  }, 
  SleepPage: SleepPage, 
  WeatherPage: WeatherPage
  }, 
  {
    initialRouteName: 'HomePage'
  }
)

const SettingsStackNavigation = createStackNavigator( 
  {
    SettingsPage: SettingsPage,
    PersonalDetailsPage: PersonalDetailsPage, 
    AssetsPage: AssetsPage
  }
)

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator, 
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} color={tintColor} />
      },
    },
    Settings: {
      screen: SettingsStackNavigation,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => <Icon name="setting" size={25} color={tintColor} />
      },
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
    LoadingPage: LoadingPage,
    LoginPage: LoginStackNavigator,
    Dashboard: { screen: DashboardStackNavigator }
  },
  {
    initialRouteName: 'LoadingPage'
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
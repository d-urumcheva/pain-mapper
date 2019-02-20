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
import WeatherPage from './application/src/assetPages/WeatherPage';
import MoodDailyView from './application/src/assetComponents/MoodDailyView';
import MoodWeeklyView from './application/src/assetComponents/MoodWeeklyView';
import MoodMonthlyView from './application/src/assetComponents/MoodMonthlyView';
import SleepGoalView from './application/src/assetComponents/SleepGoalView';
import SleepDailyView from './application/src/assetComponents/SleepDailyView';
import SleepWeeklyView from './application/src/assetComponents/SleepWeeklyView';
import SleepMonthlyView from './application/src/assetComponents/SleepMonthlyView';

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
        screen: MoodMonthlyView, 
        navigationOptions: {
          header: null, 
        }
      }
    }, 
    {
      swipeEnabled: false
    }, 
  )

  MoodTabNavigator.navigationOptions = {
    header: null,
  };


  const SleepTabNavigator = createMaterialTopTabNavigator(
    {
      Goals: {
        screen: SleepGoalView,

      }, 
      Daily: {
        screen: SleepDailyView, 
        navigationOptions: {
          header: null, 
        }
      },
      Weekly: {
        screen: SleepWeeklyView, 
        navigationOptions: {
          header: null, 
        }
      },
      Monthly: {
        screen: SleepMonthlyView, 
        navigationOptions: {
          header: null, 
        }
      }
    }, 
    {
      swipeEnabled: false
    }
  )

  SleepTabNavigator.navigationOptions = {
    header: null,
    headerStyle: {
      backgroundColor: 'steelblue'
    }
  };

const HomeStackNavigator = createStackNavigator(
  {
  HomePage: HomePage,
  MoodPage: {
    screen: MoodTabNavigator
  }, 
  SleepPage: {
    screen: SleepTabNavigator
  },
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
      headerStyle: {
        backgroundColor: 'steelblue'
      }
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
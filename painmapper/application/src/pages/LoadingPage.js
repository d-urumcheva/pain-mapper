
import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase';

export default class Loading extends Component {

  componentWillMount() {
    firebase.auth().onIdTokenChanged(user => {
      if (user) {
        this.props.navigation.navigate('DashboardTabNavigator')
      }
      else {
        this.props.navigation.navigate('LoginPage')
      }
    })
  }
  
   render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
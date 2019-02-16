import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import { withNavigation } from 'react-navigation';

class WeatherPage extends Component {

  constructor() {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  render () {

  return (
    <View>
      <Text style={{textAlign: 'center'}}>
        Weather Page
      </Text> 
    </View>
  )
}

static navigationOptions = {
  title: 'Weather',
  headerStyle: {
    backgroundColor: 'steelblue'
  },
  headerTitleStyle: {
    paddingLeft: 85,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white'
  },
}

}

export default withNavigation(WeatherPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'steelblue',
    paddingLeft: 3,
    paddingVertical: 2
  },
  text: {
    alignContent: 'center',
    justifyContent: 'center'
  }
})
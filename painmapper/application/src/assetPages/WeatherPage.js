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

  fetchView(index) {
    if(index === 0) {
      return <Text> This is daily view! </Text>
    }
    if(index === 1) {
      return <Text> This is weekly view! </Text>
    }
    if(index === 2) {
      return <Text> This is monthly view! </Text>
    }
  }

  componentWillMount() {
    let i = 0;
    this.fetchView(i);
  }

  render () {
  const buttons = ['Daily', 'Weekly', 'Monthly']
  const { selectedIndex } = this.state

  return (
    <View>
      <View>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
      </View>
      <View>
        {this.fetchView(selectedIndex)}
      </View>

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
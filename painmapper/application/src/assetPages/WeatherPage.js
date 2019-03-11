import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, PermissionsAndroid, Platform, ToastAndroid, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import ForecastCard from '../components/ForecastCard'
import { withNavigation } from 'react-navigation';

class WeatherPage extends Component {

  constructor() {
    super()

    this.state = {
      isLoading: true,
      alt: 0,
      lat: 0,
      long: 0,
      forecast: []
    }
  }

  async  hasLocationPermission() {
    if (Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        "Location permission denied by user.", ToastAndroid.LONG
      );
    }
    else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        "Location permission revoked by user.", ToastAndroid.LONG
      );
    }

    return false;
  }

  async getLocation() {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) return;

    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          lat: position.coords.latitude,
          alt: position.coords.altitude,
          long: position.coords.longitude,
        })
        this.getWeather();
      },
      (error) => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  getWeather() {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + this.state.lat + '&lon=' + this.state.long + '&units=metric&appid=' + '856ecbf56f75e0538ff96c5457011817';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          forecast: data,
          isLoading: false
        });
      })

  }

  componentWillMount() {
    this.getLocation()
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    else {
      { console.log(this.state) }

      return (
        // <ScrollView horizontal={true}
        // pagingEnabled={true} >
        // <View style={styles.card}>
        //   <Text style={{ textAlign: 'center' }}>
        //     {this.state.forecast.city.name}
        //   </Text>
        // </View>
        // <View style={styles.card}>
        //   <Text style={{ textAlign: 'center' }}>
        //     {this.state.forecast.city.country}
        //   </Text>
        // </View>
        // </ScrollView>

        <FlatList data={this.state.forecast.list} 
        style={{ marginTop: 20 }} 
        keyExtractor={item => item.dt_txt} 
        renderItem={ ({ item }) => <ForecastCard detail={item} location={this.state.forecast.city.name} />} 
        />

      )
    }
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
  },
  card: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
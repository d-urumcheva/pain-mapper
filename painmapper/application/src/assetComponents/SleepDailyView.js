import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import { AirbnbRating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class SleepDailyView extends Component {

  constructor() {
    super()
    this.state = {
      selectedDateString: new Date().toJSON().slice(0, 10),
      selectedDate: new Date(),
      sleepDuration: "",
      sleepQuality: 0,
      sleepDetails: ""
    }
    this.getSleepDetails(this.state.selectedDateString);
  }

  updateSleepDetails() {
    let user = firebase.auth().currentUser
    db
      .collection("users")
      .doc(user.uid)
      .collection("sleep")
      .doc(this.state.selectedDateString)
      .set({
        selectedDate: this.state.selectedDate,
        sleepDuration: this.state.sleepDuration,
        sleepQuality: this.state.sleepQuality,
        sleepDetails: this.state.sleepDetails
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
  }

  getSleepDetails(date) {
    let user = firebase.auth().currentUser
    db
      .collection("users")
      .doc(user.uid)
      .collection("sleep")
      .doc(date)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            sleepDuration: doc.data().sleepDuration,
            sleepQuality: doc.data().sleepQuality,
            sleepDetails: doc.data().sleepDetails
          })
        } else {
          this.setState({
            sleepDuration: 0,
            sleepQuality: 0,
            sleepDetails: ""
          })
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  setPreviousDay() {
    var prevDay = new Date(this.state.selectedDate.getTime() - 864e5);
    this.setState({ selectedDate: prevDay })
    var prevDayString = prevDay.toJSON().slice(0, 10);
    this.setState({ selectedDateString: prevDayString });
    this.getSleepDetails(prevDayString)
  }

  setNextDay() {
    var nextDay = new Date(this.state.selectedDate.getTime() + 864e5);
    this.setState({ selectedDate: nextDay })
    var nextDayString = nextDay.toJSON().slice(0, 10);
    this.setState({ selectedDateString: nextDayString });
    this.getSleepDetails(nextDayString)
  }

  render() {
    today = new Date().toJSON().slice(0, 10);
    return (
      <ImageBackground
        source={require('../../images/sleepBackground.jpg')}
        style={styles.container} >
        {(this.state.selectedDateString == today) ?
          (
            <View style={styles.dateNavigatorShort}>
              <Icon name="caretleft" size={25} color={'steelblue'} onPress={() => this.setPreviousDay()} />
              <Text style={styles.dateText}> Today </Text>
            </View>
          ) : (
            <View style={styles.dateNavigatorLong}>
              <Icon name="caretleft" size={25} color={'steelblue'} onPress={() => this.setPreviousDay()} />
              <Text style={styles.dateText}> {this.state.selectedDateString} </Text>
              <Icon name="caretright" size={25} color={'steelblue'} onPress={() => this.setNextDay()} />
            </View>
          )
        }
        <Text style={styles.infoText}>
          Let us know how you slept last night!
              </Text>
        <TextInput style={styles.inputSleep}
          placeholder={'How long did you sleep?'} placeholderTextColor={"black"}
          fontStyle={this.state.sleepDuration.length == 0 ? 'italic' : 'normal'}
          textAlignVertical={'top'}
          blurOnSubmit={true}
          onChangeText={(text) => this.setState({ sleepDuration: text })}
          value={`${this.state.sleepDuration}`}
        />
        <View style={styles.sleepQuality}>
          <Text style={styles.qualityText}>
            Quality:
            </Text>
          <View style={styles.inputSleepQuality}>
            <AirbnbRating
              count={5}
              defaultRating={this.state.sleepQuality}
              showRating={false}
              size={20}
              onFinishRating={(number) => this.setState({ sleepQuality: number })} />
          </View>
        </View>
        <TextInput style={styles.inputSleepDetail}
          placeholder={'Tell us more'} placeholderTextColor={"black"}
          fontStyle={this.state.sleepDetails.length == 0 ? 'italic' : 'normal'}
          textAlignVertical={'top'}
          blurOnSubmit={true}
          multiline={true}
          returnKeyType='none'
          onChangeText={(text) => this.setState({ sleepDetails: text })}
          value={this.state.sleepDetails}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => {
            this.updateSleepDetails()
            ToastAndroid.showWithGravityAndOffset(
              'Sleep details updated!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              0, 280)
          }}>
          <Text style={styles.buttonText}>
            Update
            </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateNavigatorShort: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  dateNavigatorLong: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  dateText: {
    fontSize: 25,
    paddingHorizontal: 10,
    color: 'white'
  },
  infoText: {
    position: 'absolute',
    bottom: 250,
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    paddingTop: 100,
    marginBottom: 10,
  },
  inputSleep: {
    position: 'absolute',
    bottom: 210,
    alignSelf: 'center',
    backgroundColor: 'white',
    opacity: 0.2,
    height: 40,
    width: 280,
    borderRadius: 15,
    fontSize: 15,
    padding: 10,
    paddingLeft: 30,
  },
  sleepQuality: {
    position: 'absolute',
    bottom: 180,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    width: 280,

  },
  qualityText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.2,
    fontStyle: 'italic',
    paddingTop: 3,
  },
  inputSleepQuality: {
    marginLeft: 30,
    fontSize: 15,
  },
  inputSleepDetail: {
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
    backgroundColor: 'white',
    opacity: 0.2,
    height: 100,
    width: 280,
    borderRadius: 15,
    fontSize: 15,
    padding: 10,

  },
  button: {
    position: 'absolute',
    bottom: 10,
    width: 100,
    height: 35,
    backgroundColor: 'white',
    opacity: 0.5,
    borderRadius: 25,
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  mood1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7d56c0',
    width: Dimensions.get('window').width,
  }
})
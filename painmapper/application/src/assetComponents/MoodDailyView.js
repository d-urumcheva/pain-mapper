import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class MoodDailyView extends Component {

  constructor() {
    super()
    this.state = {
      selectedDateString: new Date().toJSON().slice(0, 10),
      selectedDate: new Date(),
      selectedMood: 720,
      selectedMoodString: "",
      selectedMoodDetails: "",
    }
    this.getMoodDetails(this.state.selectedDateString);
  }

  updateMoodDetails() {
    let user = firebase.auth().currentUser
    db
      .collection("users")
      .doc(user.uid)
      .collection("mood")
      .doc(this.state.selectedDateString)
      .set({
        selectedDate: this.state.selectedDate,
        selectedMood: this.state.selectedMood,
        selectedMoodString: this.state.selectedMoodString,
        selectedMoodDetails: this.state.selectedMoodDetails
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.log("Error writing document: ", error);
      });
  }

  getMoodDetails(date) {
    let user = firebase.auth().currentUser
    db
      .collection("users")
      .doc(user.uid)
      .collection("mood")
      .doc(date)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            selectedMood: doc.data().selectedMood,
            selectedMoodDetails: doc.data().selectedMoodDetails,
          })
        } else {
          this.setState({
            selectedMood: 720,
            selectedMoodDetails: "",
          })
          console.log("No such document!");
        }
        this.refs.scrollView.scrollTo({ x: this.state.selectedMood, y: 0 });
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
    this.getMoodDetails(prevDayString)
  }

  setNextDay() {
    var nextDay = new Date(this.state.selectedDate.getTime() + 864e5);
    this.setState({ selectedDate: nextDay })
    var nextDayString = nextDay.toJSON().slice(0, 10);
    this.setState({ selectedDateString: nextDayString });
    this.getMoodDetails(nextDayString)
  }

  setMoodString(e) {
    let moodString = '';
    if (e.nativeEvent.contentOffset.x == 0) moodString = 'Very bad'
    else if (e.nativeEvent.contentOffset.x == 360) moodString = 'Bad'
    else if (e.nativeEvent.contentOffset.x == 720) moodString = 'Okay'
    else if (e.nativeEvent.contentOffset.x == 1080) moodString = 'Good'
    else if (e.nativeEvent.contentOffset.x == 1440) moodString = 'Excellent'
    this.setState({
      selectedMood: e.nativeEvent.contentOffset.x,
      selectedMoodString: moodString
    })
  }

  render() {
    today = new Date().toJSON().slice(0, 10);
    return (
      <View style={styles.container}>
        <ScrollView ref='scrollView'
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={e => this.setMoodString(e)}>
          <View style={styles.mood1}>
            <Image style={styles.icon}
              source={{ uri: 'https://i.imgur.com/J1Jck4n.png' }} />
          </View>
          <View style={styles.mood2}>
            <Image style={styles.icon}
              source={{ uri: 'https://i.imgur.com/7dsJ98d.png' }} />
          </View>
          <View style={styles.mood3}>
            <Image style={styles.icon}
              source={{ uri: 'https://i.imgur.com/lnQtHny.png' }} />
          </View>
          <View style={styles.mood4}>
            <Image style={styles.icon}
              source={{ uri: 'https://i.imgur.com/LvyQeZi.png' }} />
          </View>
          <View style={styles.mood5}>
            <Image style={styles.icon}
              source={{ uri: 'https://i.imgur.com/ZRoBJVy.png' }} />
          </View>
        </ScrollView>
        { (this.state.selectedDateString == today) ?
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
          Swipe left or right to select your mood
              </Text>
        <TextInput style={styles.inputTextBox}
          placeholder={'Tell us more about yourself today'} placeholderTextColor={"black"}
          fontStyle={this.state.selectedMoodDetails.length == 0 ? 'italic' : 'normal'}
          multiline={true}
          returnKeyType='none'
          textAlignVertical={'top'}
          blurOnSubmit={true}
          onChangeText={(text) => this.setState({ selectedMoodDetails: text })}
          value={this.state.selectedMoodDetails}
        />
        <TouchableOpacity style={styles.button}
          onPress={() => {
            this.updateMoodDetails()
            ToastAndroid.showWithGravityAndOffset(
              'Mood details updated!', 
              ToastAndroid.SHORT, 
              ToastAndroid.BOTTOM, 
              0, 280)
            }}>
          <Text style={styles.buttonText}>
            Update
            </Text>
        </TouchableOpacity>
      </View>
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
    left: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10
  },
  dateNavigatorLong: {
    position: 'absolute',
    top: 20,
    left: 85,
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
    top: 250,
    left: 60,
    color: 'white',
    fontSize: 16,
    paddingTop: 100,
    fontStyle: 'italic'
  },
  inputTextBox: {
    position: 'absolute',
    bottom: 70,
    left: 40,
    backgroundColor: 'white',
    opacity: 0.2,
    height: 90,
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

  },
  mood2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b6abe',
    width: Dimensions.get('window').width,

  },
  mood3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bbd2',
    width: Dimensions.get('window').width,

  },
  mood4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9bca64',
    width: Dimensions.get('window').width,

  },
  mood5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4bae4f',
    width: Dimensions.get('window').width,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: -4,
    opacity: 0.4,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
})
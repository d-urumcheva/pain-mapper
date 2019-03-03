import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { DatePicker } from 'react-native-wheel-datepicker';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class SleepGoalView extends Component {

    constructor() {
        super()

        this.state = {
            goalWakeTime: new Date(),
            goalSleepDuration: 8
        }
    }

    updateSleepGoals() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("sleepGoals")
            .set({
                goalSleepDuration: this.state.goalSleepDuration,
                goalWakeTime: this.state.goalWakeTime
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            });
    }

    getSleepGoals() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("sleepGoals")
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({
                        goalSleepDuration: doc.data().goalSleepDuration,
                        goalWakeTime: doc.data().goalWakeTime,
                    })
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }


    decrementGoalSleepDuration() {
        let sleepDuration = this.state.goalSleepDuration;
        if (sleepDuration === 0) {
            this.setState({ goalSleepDuration: 12 })
        }
        else {
            this.setState({ goalSleepDuration: sleepDuration - 1 })
        }
    }

    incrementGoalSleepDuration() {
        let sleepDuration = this.state.goalSleepDuration;
        if (sleepDuration === 12) {
            this.setState({ goalSleepDuration: 0 })
        }
        else {
            this.setState({ goalSleepDuration: sleepDuration + 1 })
        }
    }

    componentWillMount() {
        this.getSleepGoals();
    }

    render() {
        return (
            <ImageBackground
                source={require('../../images/sleepBackground.jpg')}
                style={styles.container}>
                <Text style={styles.wakeUpText}>
                    What time do you need to wake up?
                </Text>
                <View style={styles.timePickerContainer}>
                    <DatePicker
                        style={{ backgroundColor: 'transparent' }}
                        height={10}
                        date={this.state.goalWakeTime}
                        textColor='white'
                        mode="time"
                        onDateChange={date => this.setState({ goalWakeTime: date })}
                    />
                </View>
                <Text style={styles.durationText}>
                    How much sleep do you aim for?
                </Text>
                <View style={styles.sleepDuration}>
                    <Icon name="minus" size={25} color={'white'} onPress={() => this.decrementGoalSleepDuration()} />
                    <Text style={{color: 'white', fontSize: 25, paddingHorizontal: 10}}> {this.state.goalSleepDuration} </Text>
                    <Icon name="plus" size={25} color={'white'} onPress={() => this.incrementGoalSleepDuration()} />
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.updateSleepGoals()
                        ToastAndroid.showWithGravityAndOffset(
                            'Sleep goals updated!',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            0, 280)
                    }}>
                    <Text style={styles.buttonText}>
                        Update
            </Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
    },
    infoText: {
        color: 'white',
        opacity: 0.8,
        fontSize: 16,
        paddingTop: 50,
        paddingHorizontal: 30,
        fontStyle: 'italic',
    },
    wakeUpText: {
        position: 'absolute',
        color: 'white',
        opacity: 0.5,
        fontSize: 20,
        top: 140,
        paddingHorizontal: 40,
    },
    timePickerContainer: {
        position: 'absolute',
        top: 160,
        left: 125,
        width: 100,
        height: 120,
        backgroundColor: `rgba(255, 255, 255, 0)`
    },
    durationText: {
        position: 'absolute',
        color: 'white',
        opacity: 0.5,
        fontSize: 20,
        top: 370,
        paddingHorizontal: 30,
    },
    sleepDuration: {
        position: 'absolute',
        flexDirection: 'row',
        top: 400,
        left: 130
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
})
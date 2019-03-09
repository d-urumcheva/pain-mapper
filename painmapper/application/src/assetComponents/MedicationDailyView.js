import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class MedicationDailyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedDateString: new Date().toJSON().slice(0, 10),
            selectedDate: new Date(),

        }
        this.getMedicationDetails(this.state.selectedDateString);
    }

    updateMedicationDetails() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("medication")
            .doc(this.state.selectedDateString)
            .set({
                selectedDate: this.state.selectedDate,
                // sleepDuration: this.state.sleepDuration,
                // sleepQuality: this.state.sleepQuality,
                // sleepDetails: this.state.sleepDetails
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            });
    }

    getMedicationDetails(date) {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("medication")
            .doc(date)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({
                        // sleepDuration: doc.data().sleepDuration,
                        // sleepQuality: doc.data().sleepQuality,
                        // sleepDetails: doc.data().sleepDetails
                    })
                } else {
                    this.setState({
                        // sleepDuration: 0,
                        // sleepQuality: 0,
                        // sleepDetails: ""
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
    }

    setNextDay() {
        var nextDay = new Date(this.state.selectedDate.getTime() + 864e5);
        this.setState({ selectedDate: nextDay })
        var nextDayString = nextDay.toJSON().slice(0, 10);
        this.setState({ selectedDateString: nextDayString });
    }

    render() {
        today = new Date().toJSON().slice(0, 10);
        return (
            <View style={styles.container} >
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

                <View style={styles.medicationContainer}>
                    <View style={styles.row}>
                        <View style={styles.dayTile}>
                            <Text style={styles.dayTime}> 
                                Morning
                            </Text>
                        </View>
                        <View style={styles.dayTile}>
                        <Text style={styles.dayTime}> 
                                Afternoon
                            </Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.dayTile}>
                        <Text style={styles.dayTime}> 
                                Evening
                            </Text>
                        </View>
                        <View style={styles.dayTile}>
                        <Text style={styles.dayTime}> 
                                Night
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.updateMedicationDetails()
                        ToastAndroid.showWithGravityAndOffset(
                            'Medication details updated!',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    dateNavigatorLong: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    dateText: {
        fontSize: 25,
        paddingHorizontal: 10,
        color: 'steelblue'
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
    medicationContainer: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width, 
        flexDirection: 'row', 
    },  
    row: {

    },
    dayTile: {
        width: Dimensions.get('window').width/2 - 10,
        height: Dimensions.get('window').width/2 - 10,
        borderRadius: 25, 
        margin: 5,
        backgroundColor: '#F0F0F0', 
        opacity: 0.5
    },
    dayTime: {
        fontSize: 18,
        marginVertical: 5, 
        textAlign: 'center'
    },

    button: {
        position: 'absolute',
        bottom: 10,
        width: 100,
        height: 35,
        backgroundColor: 'steelblue',
        opacity: 0.8,
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
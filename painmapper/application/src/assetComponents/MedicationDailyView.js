import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ToastAndroid, CheckBox, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class MedicationDailyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedDateString: new Date().toJSON().slice(0, 10),
            selectedDate: new Date(),
            isLoading: true,
            medication: [],
            medicationMorning: [],
            medicationAfternoon: [],
            medicationEvening: [],
            medicationNight: [],
        }
        this.getMedicationSchedule(this.state.selectedDateString);
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

            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            });
    }

    getMedicationSchedule() {
        let medication;
        let medicationMorning = [];
        let medicationAfternoon = [];
        let medicationEvening = [];
        let medicationNight = [];
        let object;
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("medicationGoals")
            .get()
            .then(doc => {
                if (doc.exists) {
                    medication = doc.data().medication
                    medication.map((item) => {
                        object = {
                            name: item.name,
                            checkbox: false
                        }
                        switch (item.time) {
                            case 'sunrise':
                                medicationMorning.push(object);
                                break;
                            case 'sun':
                                medicationAfternoon.push(object);
                                break;
                            case 'sunset':
                                medicationEvening.push(object);
                                break;
                            case 'moon':
                                medicationNight.push(object);
                                break;
                            default: { }
                        }
                    })
                    this.setState({
                        isLoading: false,
                        medication: doc.data().medication,
                        medicationMorning: medicationMorning,
                        medicationAfternoon: medicationAfternoon,
                        medicationEvening: medicationEvening,
                        medicationNight: medicationNight
                    })
                } else {
                    this.setState({
                        medication: [],
                    })
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
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

    toggleCheckBoxValue(item, index, array) {
        let newArray = array;
        let object = {
            name: item.name,
            checkbox: !item.checkbox
        }
        array[index] = object;
        this.setState({ $array: array })
    }

    componentWillMount() {
        this.getMedicationSchedule();
    }

    render() {
        const medicationMorning = this.state.medicationMorning.map((item, index) => {
            return (
                <View style={styles.row} key={item.name}>
                    <Text> {item.name} </Text>
                    <CheckBox value={item.checkbox}
                        size={15}
                        onValueChange={() => this.toggleCheckBoxValue(item, index, this.state.medicationMorning)}
                    />
                </View>
            )
        })
        const medicationAfternoon = this.state.medicationAfternoon.map((item, index) => {
            return (
                <View style={styles.row} key={item.name}>
                    <Text> {item.name} </Text>
                    <CheckBox value={item.checkbox}
                        onValueChange={() => this.toggleCheckBoxValue(item, index, this.state.medicationAfternoon)}
                    />
                </View>
            )
        })
        const medicationEvening = this.state.medicationEvening.map((item, index) => {
            return (
                <View style={styles.row} key={item.name}>
                    <Text> {item.name} </Text>
                    <CheckBox value={item.checkbox}
                        onValueChange={() => this.toggleCheckBoxValue(item, index, this.state.medicationEvening)}
                    />
                </View>
            )
        })
        const medicationNight = this.state.medicationNight.map((item, index) => {
            return (
                <View style={styles.row} key={item.name}>
                    <Text> {item.name} </Text>
                    <CheckBox value={item.checkbox}
                        onValueChange={() => this.toggleCheckBoxValue(item, index, this.state.medicationNight)}
                    />
                </View>
            )
        })

        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        else {   
        { console.log(this.state) }
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
                    <View>
                        <View style={styles.dayTile}>
                            <Text style={styles.dayTime}>
                                Morning
                            </Text>
                            {medicationMorning}
                        </View>
                        <View style={styles.dayTile}>
                            <Text style={styles.dayTime}>
                                Afternoon
                            </Text>
                            {medicationAfternoon}
                        </View>
                    </View>
                    <View>
                        <View style={styles.dayTile}>
                            <Text style={styles.dayTime}>
                                Evening
                            </Text>
                            {medicationEvening}
                        </View>
                        <View style={styles.dayTile}>
                            <Text style={styles.dayTime}>
                                Night
                            </Text>
                            {medicationNight}
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
    }
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width/3,
        height: Dimensions.get('window').width/3,
        margin: 5,
        height: 15,
    },
    dayTile: {
        justifyContent: 'center', 
        alignItems: 'center',
        width: Dimensions.get('window').width / 2 - 10,
        height: Dimensions.get('window').width / 2 - 10,
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
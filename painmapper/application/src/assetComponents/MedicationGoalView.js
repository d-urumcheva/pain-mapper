import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, ToastAndroid, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class MedicationGoalView extends Component {

    constructor() {
        super()
        this.state = {
            newMedTime: 'sunrise',
            newMedName: '',
            newMedDose: '', 
            medication: []
        }
        this.getMedicationDetails();
    }

    updateMedicationDetails() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("medicationGoals")
            .set({
                medication: this.state.medication
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            });
    }

    getMedicationDetails() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("medicationGoals")
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({
                        medication: doc.data().medication
                    })
                } else {
                    this.setState({
                        medication: []
                    })
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }

    addMedication() {
        let medication = this.state.medication;

        let object = {
            time: this.state.newMedTime, 
            name: this.state.newMedName, 
            dose: this.state.newMedDose
        }
        medication.push(object)
        let order = { sunrise: 1, sun: 2, sunset: 3, moon: 4}
        medication.sort( (a, b) => { return order[a.time] - order[b.time]} );

        this.setState({ 
            medication: medication, 
            newMedName: '',
            newMedTime: 'sunrise', 
            newMedDose: ''
        })
        ToastAndroid.showWithGravityAndOffset(
            'New medication added!',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            0, 280)
        this.updateMedicationDetails();
    }

    removeMedication(index) {
        let medication = this.state.medication;
        medication.splice(index, 1)
        this.setState({ medication: medication})
        this.updateMedicationDetails();
    }

    render() {
        console.log(this.state)

        const repeatedMeds = this.state.medication.map( (item, index) => {
            return (
                <View style={styles.row} key={item.name}>
                    <Icon name={item.time} size={20} color={'steelblue'} />
                    <Text style={{marginLeft: 20, width: '40%', fontSize: 16}}> {item.name} </Text>
                    <Text style={{width: '20%', fontSize: 16}}> dose: {item.dose} </Text>
                    <Icon name="minus" size={20} color={'steelblue'} 
                    onPress={() => {this.removeMedication(index)}}/>
                </View>
            );
        });

        return (
            <View style={styles.container} >
                <Text style={styles.infoText}>
                    You can manage your repeated medication here!
                </Text>
                <View style={styles.repeatedMeds}>
                {repeatedMeds}

                </View>
                <View style={styles.addMedication}>
                    <Picker
                        selectedValue={this.state.newMedTime}
                        style={styles.dropDownBox}
                        onValueChange={(itemValue) => this.setState({ newMedTime: itemValue })} >
                        <Picker.Item label="Morning" value='sunrise' />
                        <Picker.Item label="Afternoon" value='sun' />
                        <Picker.Item label="Evening" value='sunset' />
                        <Picker.Item label="Night" value='moon' />
                    </Picker>
                    <TextInput style={styles.inputMedName}
                        placeholder={'Medicine name'} placeholderTextColor={"grey"}
                        fontStyle={this.state.newMedName.length == 0 ? 'italic' : 'normal'}
                        multiline={false}
                        returnKeyType='none'
                        textAlignVertical={'top'}
                        blurOnSubmit={true}
                        onChangeText={(text) => this.setState({ newMedName: text })}
                        value={this.state.newMedName}
                    />
                    <TextInput style={styles.inputMedDose}
                        placeholder={"Dose"} placeholderTextColor={"grey"}
                        fontStyle={this.state.newMedDose.length == 0 ? 'italic' : 'normal'}
                        multiline={false}
                        returnKeyType='none'
                        textAlignVertical={'top'}
                        blurOnSubmit={true}
                        onChangeText={(text) => this.setState({ newMedDose: text })}
                        value={this.state.newMedDose}
                    />
                    <TouchableOpacity style={styles.buttonAdd}
                        onPress={() => this.addMedication()}>
                        <Text style={styles.buttonText}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
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
        top: 10,
        alignSelf: 'center',
        color: '#CCCCCC',
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 20
    },
    repeatedMeds: {
        position: 'absolute', 
        top: 110, 
        width: '90%'
    },
    row: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginVertical: 2, 
        marginHorizontal: 10,
        height: 25, 
    },
    addMedication: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        width: '100%',
        height: 40,
        margin: 20, 
        borderColor: 'grey', 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
    },
    dropDownBox: {
        height: 35,
        width: '35%'
    },
    inputMedName: {
        height: 35,
        width: '40%', 
    },
    inputMedDose: {
        height: 35,
        width: '10%', 
    },
    buttonAdd: {
        width: 35,
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
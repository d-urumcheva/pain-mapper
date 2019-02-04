import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Switch, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'react-native-firebase'

import { withNavigation } from 'react-navigation';

var db = firebase.firestore();

class AssetsPage extends Component {
    constructor(props) {
        super(props)
        
    }
    state = {
        food: false, 
        sleep: false, 
        pain: false, 
        exercise: false, 
        motivation: false, 
        symptoms: false, 
        mood: false
    }

    static navigationOptions = {
        title: 'Assets',
        headerStyle: {
            backgroundColor: 'steelblue'
        },
        headerTitleStyle: {
            paddingLeft: 80,
            justifyContent: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            color: 'white'
        },
    }

    assetsList = [
        {
            name: 'food',
            assetName: 'Food'
        },
        {
            name: 'sleep',
            assetName: 'Sleep'
        },
        {
            name: 'pain',
            assetName: 'Pain'
        },
        {
            name: 'exercise',
            assetName: 'Exercise'
        },
        {
            name: 'motivation',
            assetName: 'Motivation'
        },
        {
            name: 'symptoms',
            assetName: 'Symptoms'
        },
        {
            name: 'mood',
            assetName: 'Mood'
        }
    ];

    getAssetSettings() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("assetSettings")
            .get()
            .then(doc => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    this.setState({
                        food: doc.data().state.food,
                        sleep: doc.data().state.sleep,
                        pain: doc.data().state.pain,
                        exercise: doc.data().state.exercise,
                        motivation: doc.data().state.motivation,
                        symptoms: doc.data().state.symptoms,
                        mood: doc.data().state.mood
                    })
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }

    updateAssetSettings() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("assetSettings")
            .set({
                state: this.state
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            });

    }

    componentWillMount() {
        this.getAssetSettings();
    }

    render() {
        const assetView = this.assetsList.map(item => {
            return (
                <View style={styles.row} key={item.name}>
                    <Text style={styles.rowText}>
                        {item.assetName}
                    </Text>
                    <Switch
                        value={this.state[item.name]}
                        onValueChange={value => { this.setState({ [item.name]: value }) }}
                    />
                </View>
            );
        })

        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    {assetView}
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.updateAssetSettings()
                        this.props.navigation.navigate('HomePage')
                    }}>
                    <Text style={styles.buttonText}>
                        Done
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

export default withNavigation(AssetsPage);

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#efeff4',
        flexGrow: 1,
    },
    container: {
        marginVertical: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        backgroundColor: '#ffffff',
        marginVertical: 1,
        justifyContent: 'space-between',
    },
    rowText: {
        fontSize: 20,
        color: '#333333',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
    toggle: {
        width: 20,
        height: 10
    },
    button: {
        width: 100,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        marginTop: 15,
        alignSelf: 'center',

    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
})

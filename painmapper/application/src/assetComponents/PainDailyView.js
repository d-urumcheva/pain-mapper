import React, { Component } from 'react';
import { StyleSheet, View, ToastAndroid, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class PainDailyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedDateString: new Date().toJSON().slice(0, 10),
            selectedDate: new Date(),
            pain: [
                { type: 'arthritis', intensity: 0 },
                { type: 'back pain',  intensity: 0 },
                { type: 'bladder pain',  intensity: 0 },
                { type: 'endometriosis',  intensity: 0 },
                { type: 'fibromyalgia',  intensity: 0 },
                { type: 'ibs',  intensity: 0 },
                { type: 'migraine',  intensity: 0 },
                { type: 'pelvic pain',  intensity: 0 },
            ]
        }
        this.getPainDetails(this.state.selectedDateString);
    }

    updatePainDetails() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("pain")
            .doc(this.state.selectedDateString)
            .set({
                selectedDate: this.state.selectedDate,
                pain: this.state.pain
            })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.log("Error writing document: ", error);
            });
    }

    getPainDetails(date) {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("pain")
            .doc(date)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({
                        pain: doc.data().pain,

                    })
                } else {
                    let pain = [
                        { type: 'arthritis',  intensity: 0 },
                        { type: 'back pain',  intensity: 0 },
                        { type: 'bladder pain',  intensity: 0 },
                        { type: 'endometriosis',  intensity: 0 },
                        { type: 'fibromyalgia',  intensity: 0 },
                        { type: 'ibs',  intensity: 0 },
                        { type: 'migraine',  intensity: 0 },
                        { type: 'pelvic pain',  intensity: 0 },
                    ]
                    this.setState({
                        pain: pain
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
        this.getPainDetails(prevDayString)
    }

    setNextDay() {
        var nextDay = new Date(this.state.selectedDate.getTime() + 864e5);
        this.setState({ selectedDate: nextDay })
        var nextDayString = nextDay.toJSON().slice(0, 10);
        this.setState({ selectedDateString: nextDayString });
        this.getPainDetails(nextDayString)
    }

    setIconUri = name => {
        switch (name) {
            case 'arthritis':
                return 'https://i.imgur.com/LFtyLU3.png';
            case 'back pain':
                return 'https://i.imgur.com/z0mHmJN.png';
            case 'bladder pain':
                return 'https://i.imgur.com/ytteBh1.png';
            case 'endometriosis':
                return 'https://i.imgur.com/zK7iqAW.png';
            case 'fibromyalgia':
                return 'https://i.imgur.com/DXgktrG.png';
            case 'ibs':
                return 'https://i.imgur.com/maN0zEr.png';
            case 'migraine':
                return 'https://i.imgur.com/xWpqgWQ.png';
            case 'pelvic pain':
                return 'https://i.imgur.com/x8kydj1.png';
            default:
                return 'https://cdn2.iconfinder.com/data/icons/rounded-white-emoticon/139/Painful-RoundedWhite_emoticon-512.png';
        }
    };

    setIconBorderStyle = intensity => {
        switch (intensity) {
            case 0:
                return styles.tileNotPressed;
            case 1:
                return styles.tileIntensity1;
            case 2:
                return styles.tileIntensity2;
            case 3:
                return styles.tileIntensity3;
            case 4:
                return styles.tileIntensity4;
            default:
                return styles.tileNotPressed;
        }
    }

    render() {
        let pain = this.state.pain;
        const painTiles = pain.map((item, index) => {
            let imageSource = this.setIconUri(item.type)
            return (
                <View style={styles.tile} key={index}>
                    <TouchableOpacity onPress={() => {
                        pain[index].intensity = ((pain[index].intensity+1) % 5 )
                        this.setState({pain: pain})
                        }}
                        style={this.setIconBorderStyle(item.intensity)}
                        key={item.type} >
                        <Image
                            style={styles.icon}
                            source={{ uri: imageSource }} />
                        <Text>
                            {item.type}
                        </Text>
                    </TouchableOpacity>
                </View >
            );
        })


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
                <View style={styles.scrollView}>
                    {painTiles}
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.updatePainDetails()
                        ToastAndroid.showWithGravityAndOffset(
                            'Pain details updated!', 
                            ToastAndroid.SHORT, 
                            ToastAndroid.BOTTOM, 
                            0, 280)
                        }}>
                    <Text style={styles.buttonText}>
                        Update
                    </Text>
                </TouchableOpacity>
            </View >
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#efeff4'
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
        color: 'steelblue'
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
    scrollView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 3,
        paddingTop: 10

    },
    tileNotPressed: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width /3-9,
        height: Dimensions.get('window').width /3-8, 
        margin: 3,
        borderRadius: 100,
        borderWidth: 4, 
        backgroundColor: '#efeff4', 
        borderColor: 'darkgrey'
    },
    tileIntensity1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width /3-9,
        height: Dimensions.get('window').width /3-9, 
        margin: 3,
        borderRadius: 100, 
        backgroundColor: 'white', 
        borderWidth: 4, 
        borderColor: '#FFE0B2'
    },
    tileIntensity2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width /3-9,
        height: Dimensions.get('window').width /3-9, 
        margin: 3,
        borderRadius: 100, 
        backgroundColor: 'white', 
        borderWidth: 4, 
        borderColor: '#FF9800'
    },
    tileIntensity3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width /3-9,
        height: Dimensions.get('window').width /3-9, 
        margin: 3,
        borderRadius: 100, 
        backgroundColor: 'white', 
        borderWidth: 4, 
        borderColor: '#FF6F00'
    },
    tileIntensity4: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width /3-9,
        height: Dimensions.get('window').width /3-9, 
        margin: 3,
        marginVertical: 4,
        borderRadius: 100, 
        backgroundColor: 'white', 
        borderWidth: 4, 
        borderColor: '#F44336'
    },
    icon: {
        width: Dimensions.get('window').width /5,
        height: Dimensions.get('window').width /5, 
    },
})
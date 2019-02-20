import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default class SleepGoalView extends Component {


    render() {
        return (
            <ImageBackground
                source={require('../../images/sleepBackground.jpg')}
                style={styles.container}>
                <Text style={styles.wakeUpText}>
                    What time do you need to wake up?
                </Text>
                <Text style={styles.durationText}>
                    How many hours of sleep do you aim to get?
                </Text>
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
        top: 150,
        paddingHorizontal: 40,
    },
    durationText: {
        position: 'absolute',
        color: 'white',
        opacity: 0.5,
        fontSize: 20,
        top: 350,
        paddingHorizontal: 40,
    }
})
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { withNavigation } from 'react-navigation';

class SleepPage extends Component {

    static navigationOptions = {
        title: 'Sleep',
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
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Hi! 
                    This is your sleep page! 
                </Text> 
            </View>
        );
    }
}

export default withNavigation(SleepPage);
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'steelblue',
        paddingLeft: 3,
        paddingVertical:2
    }, 
    text: {
        alignContent: 'center', 
        justifyContent: 'center'
    }
})
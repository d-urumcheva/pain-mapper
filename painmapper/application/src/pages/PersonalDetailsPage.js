import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import SettingsRow from '../components/SettingsRow';

import { withNavigation } from 'react-navigation';

class PersonalDetailsPage extends Component {
    
    static navigationOptions = {
        title: 'Personal Details',
        headerStyle: {
            backgroundColor: 'steelblue'
        },
        headerTitleStyle: {
            paddingLeft: 60,
            justifyContent: 'center', 
            textAlign: 'center', 
            alignSelf: 'center',
            color: 'white'
        }
    }
    
    render() {
        return (
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.container}>
                    <SettingsRow name='Name' action='openDetail' />
                    <SettingsRow name='Email' action='openDetail' />
                    <SettingsRow name='Birthday' action='openDetail' />
                    <SettingsRow name='Gender' action='openDetail' />
                </View>
                <View style={styles.container}>
                    <SettingsRow name='Change password' action='openDetail' />
                </View>
            </ScrollView>
        );
    }
}

export default withNavigation(PersonalDetailsPage);
 
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1, 
        backgroundColor: '#efeff4'
    },
    container: {
        marginTop: 10
    }
})
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import SettingsRow from '../components/SettingsRow';

import { withNavigation } from 'react-navigation';

class SettingsPage extends Component {
    
    static navigationOptions = {
        title: 'Settings',
        headerStyle: {
            backgroundColor: 'steelblue'
        },
        headerTitleStyle: {
            paddingLeft: 140,
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
                    <SettingsRow name='Personal Details' action='reroute' nextPage='PersonalDetailsPage'/>
                    <SettingsRow name='Assets' />
                    <SettingsRow name='Push Notifications' />
                </View>
                <View style={styles.container}>
                    <SettingsRow name='Report a problem' />
                    <SettingsRow name='Privacy Policy' />
                    <SettingsRow name='Help' />
                </View>
                <View style={styles.container}>
                    <SettingsRow name='Log Out' />
                </View>
            </ScrollView>
        );
    }
}

export default withNavigation(SettingsPage);
 
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1, 
        backgroundColor: '#efeff4'
    },
    container: {
        marginTop: 10
    }
})
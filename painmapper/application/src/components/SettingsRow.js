import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';

class SettingsRow extends Component {

    openDetail = () => {
        Alert.alert(
            this.props.name, 
            'Change '+this.props.name+' to:', 
            [
                {text: 'OK', onPress: () => console.log('OK button pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel button pressed')}
            ], 
            { cancelable: true}
        )
    }

    reroute = () => {
        this.props.navigation.navigate(this.props.nextPage)
    }

    logout = () => {
        firebase
        .auth()
        .signOut()
        .then(() => this.props.navigation.navigate('LoginStackNavigator'))
        .catch(error => console.log(error.message))
    }

    setAction = action => {
        switch(action) {
            case 'reroute': 
                return this.reroute.bind(this);
            case 'openDetail': 
                return this.openDetail.bind(this);
            case 'logout': 
                return this.logout.bind(this);
            case 'default':
                return () => console.log('default action chosen');
        }
    }

    render() {
        let action = this.setAction(this.props.action);

        return (
                <TouchableOpacity style={styles.row}
                onPress={action}>
                    <Text style={styles.rowText}> 
                        {this.props.name}
                    </Text>
                </TouchableOpacity>
        )
    }
}

export default withNavigation(SettingsRow);
 
const styles = StyleSheet.create({
    row: {
        flex: 1, 
        flexWrap: 'wrap', 
        height: 55,
        backgroundColor: '#ffffff',
        marginVertical: 1,
        justifyContent: 'center',
    }, 
    rowText: {
        fontSize: 20,
        color: '#333333',
        paddingLeft: 10, 
        textAlignVertical: 'center'
    }
})
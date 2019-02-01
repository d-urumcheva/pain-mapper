import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { white } from 'ansi-colors';

import { withNavigation } from 'react-navigation';

class RegisterForm extends Component {

    createAccount = () => {
        // firebase stuff

        Alert.alert(
            'Create Account',
            'We are creating your account. Bear with us.',
            [
                { text: 'OK', onPress: () => console.log('OK button pressed') }
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    placeholder='name'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                />
                <TextInput style={styles.inputBox}
                    placeholder='email'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                />
                <TextInput style={styles.inputBox}
                    placeholder='password'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <TextInput style={styles.inputBox}
                    placeholder='confirm password'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={this.createAccount.bind(this)}>
                    <Text style={styles.buttonText}>
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(RegisterForm)

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 5
    },

    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },

})
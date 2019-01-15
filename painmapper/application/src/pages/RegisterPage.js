import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';

export default class LoginPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Logo />
                    <Text style={styles.textPrompt}>
                        Create an account:
                    </Text>
                    <RegisterForm />
                    <View style={styles.loginView}>
                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.loginButton}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'steelblue',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textPrompt: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300'
    },


    loginView: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },

    loginText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    loginButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 5
    }

})

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';

export default class LoginPage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Logo style={styles.logo} />
                <LoginForm style={styles.loginForm} />
                <View style={styles.signupView}>
                    <Text style={styles.signupText}>
                        Don't have an account yet?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterPage')}>
                        <Text style={styles.signupButton}>
                            Sign up
                        </Text>
                    </TouchableOpacity>
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
    logo: {
        height: Dimensions.get('window').height * 0.3,
        alignItems: 'flex-start'

    },
    loginForm: {
        height: Dimensions.get('window').height * 0.5,
    },
    signupView: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 5
    }
})
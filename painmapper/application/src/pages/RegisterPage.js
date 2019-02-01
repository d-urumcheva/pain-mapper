import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';

import { withNavigation } from 'react-navigation';

class RegisterPage extends Component {

    static navigationOptions = {
        headerLeft: null,
        gesturesEnabled: false,
    }

    render() {
        return (
            <View style={styles.container}>
                <Logo style={styles.logo}/>
                <RegisterForm style={styles.registerForm}/>
                <View style={styles.loginView}>
                    <Text style={styles.loginText}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginPage')}>
                        <Text style={styles.loginButton}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default withNavigation(RegisterPage);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'steelblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: Dimensions.get('window').height * 0.3,
    }, 
    registerForm: {
        height: Dimensions.get('window').height * 0.5,
    },
    loginView: {
        height: Dimensions.get('window').height * 0.1,
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
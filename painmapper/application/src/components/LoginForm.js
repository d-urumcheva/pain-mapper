
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { withNavigation } from 'react-navigation';

class LoginForm extends Component {

    state = {
        email: '', 
        password: '', 
        errorMessage: null
    }

    logIn = () => {
        // firebase stuff
        
        Alert.alert(
            'Logging In',
            'We are logging you in. Bear with us.',
            [
                { text: 'OK', onPress: () => this.props.navigation.navigate('Dashboard') }
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                    placeholder='email'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput style={styles.inputBox}
                    placeholder='password'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={this.logIn.bind(this)}>
                    <Text style={styles.buttonText}>
                        Log In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassPage')}>
                    <Text style={styles.forgotPassButton} >
                        Forgot password?
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default withNavigation(LoginForm);

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
        paddingVertical: 13,
        marginTop: 15
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    forgotPassButton: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14
    },

})
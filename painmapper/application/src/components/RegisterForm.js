import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import firebase from 'react-native-firebase';

import { withNavigation } from 'react-navigation';

class RegisterForm extends Component {
    state = {
        email: '', 
        password: '', 
        errorMessage: null, 
        buttonDisabled: true,
    }

    createAccount = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( () => this.props.navigation.navigate('HomePage'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'white' }}>
                        {this.state.errorMessage}
                    </Text>
                }
                <TextInput style={styles.inputBox}
                    placeholder='email'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={email => {
                        this.setState({ email })
                        if (this.state.email=='' || this.state.password=='') {
                            this.setState({buttonDisabled: true})
                            this.setState({buttonBackgroundColor: 'white'})
                            }
                        else {
                            this.setState({buttonDisabled: false})
                            this.setState({buttonBackgroundColor: '#1c313a'}) 
                            }
                        }
                    }
                    value={this.state.email}
                />
                <TextInput style={styles.inputBox}
                    placeholder='password'
                    placeholderTextColor={"white"}
                    autoCorrect={false}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    onChangeText={password => {
                        this.setState({ password })
                        if (this.state.email=='' || this.state.password=='') {
                            this.setState({buttonDisabled: true})
                            this.setState({buttonBackgroundColor: 'white'})
                            }
                        else {
                            this.setState({buttonDisabled: false})
                            this.setState({buttonBackgroundColor: '#1c313a'}) 
                            }
                        }
                    }
                    value={this.state.password}
                />
                <TouchableOpacity style={[this.state.buttonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
                    disabled={this.state.buttonDisabled}
                    onPress={this.createAccount.bind(this)}>
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

    buttonEnabled: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        marginTop: 15
    },
    buttonDisabled: {
        width: 300,
        backgroundColor: '#9bb9c4',
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

})
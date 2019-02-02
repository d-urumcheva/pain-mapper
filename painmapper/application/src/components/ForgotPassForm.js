import React, {Component} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { white } from 'ansi-colors';
import firebase from 'react-native-firebase';

export default class ForgotPassForm extends Component {
    state = {
        email: '', 
        errorMessage: null, 
        buttonDisabled: true,
    }
  
    forgotPassword = () => {
        firebase
            .auth()
            .sendPasswordResetEmail(this.state.email) 
            .then( () => console.log('Send reset password email'))
            .catch ( error => this.setState({errorMessage: error.message}))
    }    

    render() {
      return(
      <View style={styles.container}>
        <Text style={styles.textPrompt}> 
            Oh no, did you forget your password?
        </Text>
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
        <TouchableOpacity style={[this.state.buttonDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
                    disabled={this.state.buttonDisabled}
                    onPress={this.forgotPassword.bind(this)}>
            <Text style={styles.buttonText}> 
                Reset password
            </Text>
        </TouchableOpacity>
            <Text style={styles.forgotPassButton}> 
                We'll send a new password to your email address.
            </Text>
      </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textPrompt: {
        textAlign:'center',
        fontSize: 18, 
        fontWeight: '300', 
        marginBottom: 10
    },

    inputBox: {
        width: 300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
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
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
      },

      forgotPassButton: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14
    }
})
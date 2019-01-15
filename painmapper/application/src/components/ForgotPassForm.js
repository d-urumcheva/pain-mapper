import React, {Component} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { white } from 'ansi-colors';

export default class ForgotPassForm extends Component {
  render() {
      return(
      <View style={styles.container}>
        <Text style={styles.textPrompt}> 
            Oh no, did you forget your password?
        </Text>
        <TextInput style={styles.inputBox}
            placeholder='email'
            placeholderTextColor={"white"}
            autoCorrect={false}
        />
        <TouchableOpacity style={styles.button}>
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

    button: {
        width:300,
        backgroundColor:'#1c313a',
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
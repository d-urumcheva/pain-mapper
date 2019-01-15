import React, {Component} from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { white } from 'ansi-colors';

export default class LoginForm extends Component {
  render() {
      return(
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> 
                Log In
            </Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.forgotPassButton}> 
                Forgot password?
            </Text>
        </TouchableOpacity>
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
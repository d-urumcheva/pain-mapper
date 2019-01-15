import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Logo from '../components/Logo';

export default class LoginPage extends Component {

    render() {
        return(
            <View style={styles.container}> 
                    <View> 
                        <Logo />
                    <Text style={styles.textPrompt}>
                        Create an account: 
                    </Text>
                    <RegisterForm />
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
        textAlign:'center',
        fontSize: 18, 
        fontWeight: '300'
    } 

})
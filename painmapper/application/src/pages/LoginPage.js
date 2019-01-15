import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import LoginForm from '../components/LoginForm';
import Logo from '../components/Logo';

import { withNavigation } from 'react-navigation';

class LoginPage extends Component {

    render() {
        return(
            <View style={styles.container}> 
                <View >
                    <Logo />
                    <LoginForm />
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
            </View>
        );
    }
}

export default withNavigation(LoginPage);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, 
        backgroundColor: 'steelblue', 
        alignItems: 'center', 
        justifyContent: 'center'
    }, 

    signupView : {
        alignItems: 'flex-end',
        justifyContent : 'center',
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
import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ForgotPassForm from '../components/ForgotPassForm';
import Logo from '../components/Logo';

export default class ForgotPassPage extends Component {

    render() {
        return(
            <View style={styles.container}> 
                <View >
                    <Logo />
                    <ForgotPassForm />
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

})
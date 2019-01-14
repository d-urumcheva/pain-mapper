import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends Component {

    render() {
        return(
            <View style={styles.container}>
                <Image style = {styles.logo}
                source={require('../../images/logo2.png')}/>
                <Text style={styles.textLogo}> Welcome to PainMapper! </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,  
        justifyContent: 'flex-end',
        alignItems: 'center'
    }, 

    logo: {
        width: 120,
        height: 140,
        marginTop: 20

    }, 

    textLogo: {
        fontSize: 20, 
        color: 'rgba(255, 255, 255, 0.7)',  
        marginTop:10, 
        marginBottom: 10
    }

})

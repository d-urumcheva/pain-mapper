import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native';

export default class IconTile extends Component {

    setIconUri = name => {
        switch(name) {
            case 'alcohol': 
                return 'https://i.imgur.com/Mrhf5vK.png';
            case 'energy': 
                return 'https://i.imgur.com/DdJ6Sdl.png';
            case 'exercise': 
                return 'https://i.imgur.com/7nuobez.png';
            case 'fertility': 
                return 'https://i.imgur.com/d7govbu.png';
            case 'food': 
                return 'https://i.imgur.com/ElLMq2l.png';
            case 'heartbeat': 
                return 'https://i.imgur.com/LnxgSrm.png';
            case 'hydration': 
                return 'https://i.imgur.com/7hrZctA.png';
            case 'medication': 
                return 'https://i.imgur.com/F9vPB3E.png';
            case 'meditation': 
                return 'https://i.imgur.com/yvMkEgC.png';
            case 'mood': 
                return 'https://i.imgur.com/78ppr8j.png';
            case 'motivation': 
                return 'https://i.imgur.com/omBNjN4.png';
            case 'pain': 
                return 'https://i.imgur.com/GfShnfs.png';
            case 'sleep': 
                return 'https://i.imgur.com/toJ0ZSg.png';
            case 'smoking': 
                return 'https://i.imgur.com/t7fB1M8.png';
            case 'symptoms': 
                return 'https://i.imgur.com/Zp5w9n8.png';
            default: 
                return 'https://cdn2.iconfinder.com/data/icons/rounded-white-emoticon/139/Painful-RoundedWhite_emoticon-512.png';

        }
    };

    render() {
        let iconUri=this.setIconUri(this.props.name);
        return(
            <View style={styles.tile}>
                <Image style={styles.icon}
                source={{uri: iconUri}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tile: {
        width: Dimensions.get('window').width /2 - 8,
        height: Dimensions.get('window').width /3, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        margin: 2
    }, 
    icon: {
        width: Dimensions.get('window').width /4,
        height: Dimensions.get('window').width /4, 
    }, 
    textIcon: {
        fontSize: 20, 
    }
})
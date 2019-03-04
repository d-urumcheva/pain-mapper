import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

class MoodIcon extends Component {

    setIconUri = offset => {
        switch(offset) {
            case 0: 
                return 'https://i.imgur.com/UNt8iI6.png';
            case 1: 
                return 'https://i.imgur.com/J6Ow4Yv.png';
            case 2: 
                return 'https://i.imgur.com/1IcGRU9.png';
            case 3: 
                return 'https://i.imgur.com/YtymEYq.png';
            case 4: 
                return 'https://i.imgur.com/aoh2pox.png';
            default: 
                return 'https://cdn2.iconfinder.com/data/icons/rounded-white-emoticon/139/Painful-RoundedWhite_emoticon-512.png';

        }
    };
    
    render() {
        let iconUri=this.setIconUri(this.props.offset)
        return(
                <Image style={styles.icon}
                source={{uri: iconUri}} />
        );
    }
}

export default withNavigation(MoodIcon);

const styles = StyleSheet.create({
    icon: {
        width: 50,
        height: 50, 
    }
})
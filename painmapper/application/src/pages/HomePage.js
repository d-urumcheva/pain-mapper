import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import TileView from '../components/TileView';
import firebase from 'react-native-firebase';

import { withNavigation } from 'react-navigation';

class HomePage extends Component {

    state = {
        currentUser: null
    }
    
    static navigationOptions = {
        headerLeft: null,
        gesturesEnabled: false,
        title: 'Home',
        headerStyle: {
            backgroundColor: 'steelblue'
        },
        headerTitleStyle: {
            paddingLeft: 140,
            justifyContent: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            color: 'white'
        },
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({currentUser})
    }
    
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                   <Text> 
                       This will be a calendar-like feature
                    </Text>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                    </Text>        
                </View>
                <TileView />
            </ScrollView>
        );
    }
}

export default withNavigation(HomePage);
 
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1, 
        backgroundColor: 'steelblue'
    },
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
        height: Dimensions.get('window').height * 0.35,
        backgroundColor: 'steelblue',
        paddingLeft: 3,
        paddingVertical:2
    }
})
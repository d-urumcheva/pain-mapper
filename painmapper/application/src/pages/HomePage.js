import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import TileView from '../components/TileView';
import firebase from 'react-native-firebase';

import FontAwesome, { Icons, IconTypes } from 'react-native-fontawesome';

import { withNavigation } from 'react-navigation';

class HomePage extends Component {

    state = {
        currentUser: null
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({currentUser})
    }
    
    static navigationOptions = {
        headerLeft: null,
        gesturesEnabled: false, 
        headerStyle: {
            backgroundColor: 'steelblue'
        }
    }    
    
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                   <Text> 
                       This will be a calendar-like feature
                    </Text>
                    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
                        <FontAwesome >{Icons.home}</FontAwesome>
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
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import TileView from '../components/TileView';

import { withNavigation } from 'react-navigation';

class HomePage extends Component {
    
    render() {
        return (
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.container}>
                   <Text> 
                       This will be a calendar-like feature
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
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import ToggleSwitchRow from '../components/ToggleSwitchRow';

import { withNavigation } from 'react-navigation';

class AssetsPage extends Component {
    
    static navigationOptions = {
        title: 'Assets',
        headerStyle: {
            backgroundColor: 'steelblue'
        },
        headerTitleStyle: {
            paddingLeft: 100,
            justifyContent: 'center', 
            textAlign: 'center', 
            alignSelf: 'center',
            color: 'white'
        }
    }

    assetsList = [
        {
            name: 'food', 
            assetName: 'Food'
        }, 
        {
            name: 'sleep', 
            assetName: 'Sleep'
        },
        {
            name: 'pain', 
            assetName: 'Pain'
        },
        {
            name: 'exercise', 
            assetName: 'Exercise'
        }, 
        {
            name: 'motivation', 
            assetName: 'Motivation'
        },
        {
            name: 'symptoms', 
            assetName: 'Symptoms'
        },
        {
            name: 'mood', 
            assetName: 'Mood'
        }
    ];
    
    render() {

        const assetView = this.assetsList.map(item => {
            return (
                    <ToggleSwitchRow
                    key={item.name}
                    name={item.assetName}
                    value={item.toggleValue} />
            );
        })

        return (
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.container}>
                    {assetView}
                </View>
            </ScrollView>
           
        );
    }
}

export default withNavigation(AssetsPage);
 
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1, 
        backgroundColor: '#efeff4',
    },
    container: {
        marginVertical: 10
    }
})
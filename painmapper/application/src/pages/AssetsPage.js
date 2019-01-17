import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import ToggleSwitchRow from '../components/ToggleSwitchRow';

import { withNavigation } from 'react-navigation';

class AssetsPage extends Component {
    
    static navigationOptions = {
        title: 'Assets',
        headerStyle: {
            backgroundColor: 'steelblue'
        },
        headerTitleStyle: {
            paddingLeft: 120,
            justifyContent: 'center', 
            textAlign: 'center', 
            alignSelf: 'center',
            color: 'white'
        }
    }

    assetsList = [
        {
            name: 'food'
        }, 
        {
            name: 'sleep'
        }, 
        {
            name: 'energy'
        }
    ]
    
    render() {

        const assetView = this.assetsList.map(item => {
            return (
                    <ToggleSwitchRow
                    key={item.name}
                    name={item.name} />
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
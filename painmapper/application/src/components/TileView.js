import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import IconTile from './IconTile';

import { withNavigation } from 'react-navigation';

class TileView extends Component {

    assetsList = [
        {
            name: 'food'
        }, 
        {
            name: 'sleep'
        },
        {
            name: 'pain'
        },         
    ];

    render() {

        const iconTiles = this.assetsList.map(item => {
            return (
                    <IconTile style={styles.tile}
                    key={item.name}
                    name={item.name} />
            );
        })

        return (
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.container}>
                    {iconTiles}
                </View>
            </ScrollView>
        )
    }
}

export default withNavigation(TileView);
 
const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1, 
        backgroundColor: 'steelblue'
    },
    container: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        backgroundColor: 'steelblue',
        paddingLeft: 3,
        paddingVertical:2
    }, 
    tile: { 
        justifyContent: 'center',
        alignItems: 'center',

    }
})
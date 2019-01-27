import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import IconTile from './IconTile';

import { withNavigation } from 'react-navigation';

class TileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            assets: [
                {
                name: 'food', 
                assetName: 'Food', 
                toggleValue: true,
            }, 
            {
                name: 'sleep', 
                assetName: 'Sleep', 
                toggleValue: false,
            },
            {
                name: 'pain', 
                assetName: 'Pain' , 
                toggleValue: true,
            },         
            {
                name: 'exercise', 
                assetName: 'Exercise', 
                toggleValue: true
            }, 
            {
                name: 'food', 
                assetName: 'Food', 
                toggleValue: true,
            }, 
            {
                name: 'sleep', 
                assetName: 'Sleep', 
                toggleValue: false,
            },
            {
                name: 'pain', 
                assetName: 'Pain' , 
                toggleValue: true,
            },         
            {
                name: 'exercise', 
                assetName: 'Exercise', 
                toggleValue: true
            }]
        }
    }

    render() {

        const iconTiles = this.state.assets.map(item => {
            return (
                    <IconTile style={styles.tile}
                    key={item}
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
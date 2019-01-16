import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import IconTile from './IconTile';

import { withNavigation } from 'react-navigation';

class TileView extends Component {

    render() {
        return (
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.container}>
                    <IconTile style={styles.tile} 
                    name='food' />
                </View>
            </ScrollView>
        );
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
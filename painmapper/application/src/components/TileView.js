import React, { Component } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import IconTile from './IconTile';
import firebase from 'react-native-firebase'

import { withNavigation } from 'react-navigation';

var db = firebase.firestore();

class TileView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.getAssetSettings();
    }

    getAssetSettings() {
        let user = firebase.auth().currentUser
        db
            .collection("users")
            .doc(user.uid)
            .collection("settings")
            .doc("assetSettings")
            .get()
            .then(doc => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    this.setState({
                        food: doc.data().state.food,
                        sleep: doc.data().state.sleep,
                        pain: doc.data().state.pain,
                        exercise: doc.data().state.exercise,
                        motivation: doc.data().state.motivation,
                        symptoms: doc.data().state.symptoms,
                        mood: doc.data().state.mood
                    })
                } else {
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    }

    componentWillMount() {
        this.getAssetSettings()
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.getAssetSettings();
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    render() {
        var state = this.state
        var assets = [];
        for (var i in state) {
            assets.push({
                name: i,
                toggleValue: state[i]
            })
        }
        const iconTiles = assets.map((item, index) => {
            if (item.toggleValue) {
                return (
                    <IconTile style={styles.tile}
                        key={index}
                        name={item.name} />
                );
            }
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
        paddingVertical: 2
    },
    tile: {
        justifyContent: 'center',
        alignItems: 'center',

    }
})
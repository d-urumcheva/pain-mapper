import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

import { withNavigation } from 'react-navigation';

class ToggleSwitchRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            switchValue: false
        }
    }

    reroute = () => {
        this.props.navigation.navigate(this.props.nextPage)
    }

    render() {

        return (
                <View style={styles.row}>
                    <Text style={styles.rowText}> 
                        {this.props.name}
                    </Text>
                    <Switch 
                    value={this.state.switchValue}
                    onValueChange={ value => this.setState({switchValue: value})} />
                </View>
        )
    }
}

export default withNavigation(ToggleSwitchRow);
 
const styles = StyleSheet.create({
    row: {
        flex: 1, 
        flexDirection: 'row',
        flexWrap: 'wrap', 
        height: 55,
        backgroundColor: '#ffffff',
        marginVertical: 1,
        justifyContent: 'space-between',
        
    }, 
    rowText: {
        fontSize: 20,
        color: '#333333',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
    toggle: {
        width: 20, 
        height: 10
    }
})
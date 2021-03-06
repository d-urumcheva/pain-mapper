import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';
import {format} from 'date-fns';
import { LineChart } from 'react-native-chart-kit';
import firebase from 'react-native-firebase'
import MoodIcon from '../components/MoodIcon'

var db = firebase.firestore();

export default class MoodMonthlyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedMonth: new Date(),
            selectedMonthDatesStrings: [],
            monthlyStats: [],
            isLoading: true,
            moodByDays: [],
            daysOfMonth: []
        };

        this.getMonthlyMoodDetails = this.getMonthlyMoodDetails.bind(this);
    }

    async setMonthDates(month) {
        let dates = [];
        let day = month;
        let numberOfDays = day.toJSON().slice(8, 10)
        dates.push(day.toJSON().slice(0, 10));
        for (var i = 1; i < numberOfDays; i++) {
            day = new Date(day.getTime() - 864e5);
            dates.unshift(day.toJSON().slice(0, 10));
        }
        this.setState({ selectedMonthDatesStrings: dates })
    }

    async getMonthlyMoodDetails(month) {

        await this.setMonthDates(month);

        let user = firebase.auth().currentUser
        let monthDays = this.state.selectedMonthDatesStrings;
        let moodDays = [];
        let moodByDays = [];
        let daysOfMonth = [];

        let promises = monthDays.map(function (item) {
            return db
                .collection("users")
                .doc(user.uid)
                .collection("mood")
                .doc(item)
                .get()
                .then(doc => {

                    let docData = doc.exists ? doc.data() : null
                    return {
                        date: docData ? docData.selectedDate : new Date(item),
                        dateString: item,
                        mood: docData ? docData.selectedMood : 0,
                        moodString: docData ? docData.selectedMoodString : 'No mood recorded',
                        moodDetail: docData ? docData.selectedMoodDetails : '',
                        isMoodRecorded: !!docData
                    }
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
        })

        moodDays = await Promise.all(promises);
        for (let i = 0; i < moodDays.length; i++) {
            daysOfMonth.push(format(moodDays[i].date, 'dd'))
            moodByDays.push(moodDays[i].mood);
        }

        this.setState({
            monthlyStats: moodDays,
            isLoading: false,
            moodByDays: moodByDays,
            daysOfMonth: daysOfMonth
        })
    }

    setPreviousMonth() {
        var prevMonth = new Date(this.state.selectedDate.getTime() - 7 * 864e5);
        this.setState({ selectedMonth: prevMonth })
        var prevMonthString = prevMonth.toJSON().slice(0, 10);
        this.setState({ selectedMonthString: prevMonthString });
    }

    setNextMonth() {
        var nextMonth = new Date(this.state.selectedDate.getTime() + 7 * 864e5);
        this.setState({ selectedMonth: nextMonth })
        var nextMonthString = nextMonth.toJSON().slice(0, 10);
        this.setState({ selectedMonthString: nextMonthString });
    }

    componentWillMount() {
        this.getMonthlyMoodDetails(this.state.selectedMonth)
    }

    render() {
        const monthlyView = this.state.monthlyStats.map(item => {
            if (item.isMoodRecorded) {
                return (
                    <View style={styles.row} key={item.dateString}>
                        <Text style={styles.dateString}>
                            {item.dateString}
                        </Text>
                        <View style={styles.moodDetails}>
                            <MoodIcon offset={item.mood} style={styles.icon} />
                            <View style={styles.moodTextDetail}>
                                <Text style={styles.rowText}>
                                    {item.moodString}
                                </Text>
                                <Text style={styles.rowText}>
                                    {item.moodDetail}
                                </Text>
                            </View>

                        </View>
                    </View>
                );
            }
        })

        if (this.state.isLoading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        else {
            return (
                <ScrollView style={styles.container}>
                    <LineChart
                        data={{
                            labels: this.state.daysOfMonth,
                            datasets: [{
                                data: this.state.moodByDays
                            }]
                        }}
                        width={Dimensions.get('window').width}
                        height={230}
                        withInnerLines={false}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            }
                        }}
                        bezier
                        style={{
                            marginBottom: 5
                        }}
                    />
                    {monthlyView}
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#efeff4'
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    dateString: {
        fontSize: 10,
        fontStyle: 'italic',
        color: 'lightslategrey',
        paddingLeft: 4,
    },
    moodDetails: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        backgroundColor: '#ffffff',
        marginVertical: 1,
    },
    icon: {
        justifyContent: 'center',
    },
    moodTextDetail: {
        paddingLeft: 10,
        width: '80%'
    },
    row: {
        marginVertical: 0,
    },
    rowText: {
        flexWrap: 'wrap',
        fontSize: 14,
        color: '#333333',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
})
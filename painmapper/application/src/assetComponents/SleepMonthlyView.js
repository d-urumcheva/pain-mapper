import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';
import { Rating } from 'react-native-elements';
import { LineChart } from 'react-native-chart-kit';
import firebase from 'react-native-firebase'

var db = firebase.firestore();

export default class SleepMonthlyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedMonth: new Date(),
            selectedMonthDatesStrings: [],
            monthlyStats: [],
            isLoading: true,
            sleepByDays: [],
            daysOfMonth: []
        };

        this.getMonthlySleepDetails = this.getMonthlySleepDetails.bind(this);
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

    async getMonthlySleepDetails(month) {

        await this.setMonthDates(month);

        let user = firebase.auth().currentUser
        let monthDays = this.state.selectedMonthDatesStrings;
        let monthlyStats = [];
        let sleepByDays = [];
        let daysOfMonth = [];

        let promises = monthDays.map( (item) => {
            return db
                .collection("users")
                .doc(user.uid)
                .collection("sleep")
                .doc(item)
                .get()
                .then(doc => {
                    let date, dateString, sleepDuration, sleepQuality, sleepDetails, isSleepRecorded;
                    let object;

                    if (doc.exists) {
                        date = doc.data().selectedDate
                        dateString = item
                        sleepDuration = doc.data().sleepDuration
                        sleepQuality = doc.data().sleepQuality
                        sleepDetails = doc.data().sleepDetails
                        isSleepRecorded = true
                        object = {
                            date,
                            dateString,
                            sleepDuration,
                            sleepQuality,
                            sleepDetails,
                            isSleepRecorded
                        }
                    } else {
                        dateString = item
                        date = new Date(item);
                        sleepDuration = 0
                        sleepQuality = 0
                        sleepDetails = ""
                        isSleepRecorded = false
                        object = {
                            date,
                            dateString,
                            sleepDuration,
                            sleepQuality,
                            sleepDetails,
                            isSleepRecorded
                        }
                        console.log("No such document!");
                    }

                    return object;
                })
                .catch( (error) => {
                    console.log("Error getting document:", error);
                });
        })

        monthlyStats = await Promise.all(promises);

        for (let i = 0; i < monthlyStats.length; i++) {
            var options = { weekday: 'long' };
            daysOfMonth.push(new Intl.DateTimeFormat('en-US', options).format(monthlyStats[i].date).slice(0, 1));
            sleepByDays.push(monthlyStats[i].sleepDuration);
        }

        this.setState({
            monthlyStats: monthlyStats,
            isLoading: false,
            sleepByDays: sleepByDays,
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
        this.getMonthlySleepDetails(this.state.selectedMonth)
    }

    render() {
        const monthlyView = this.state.monthlyStats.map(item => {
            if (item.isSleepRecorded) {
                return (
                    <View style={styles.row} key={item.dateString}>
                        <Text style={styles.dateString}>
                            {item.dateString}
                        </Text>
                        <View style={styles.sleepDetails}>
                            <View style={styles.sleepDurationRating}>
                                <Text style={styles.rowText}>
                                    {item.sleepDuration} hours,
                                    </Text>
                                <Rating
                                    readonly
                                    count={5}
                                    startingValue={item.sleepQuality}
                                    showRating={false}
                                    imageSize={10} />
                            </View>
                            <View style={styles.sleepDetailsContainer}>
                                <Text style={styles.rowText}>
                                    {item.sleepDetails}
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
                    {console.log(this.state)}
                    <LineChart
                        data={{
                            labels: this.state.daysOfMonth,
                            datasets: [{
                                data: this.state.sleepByDays
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
                        height={230}
                        withInnerLines={false}
                        chartConfig={{
                            backgroundColor: '#121236',
                            backgroundGradientFrom: '#030210',
                            backgroundGradientTo: '#403361',
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
    sleepDurationRating: {
        width: '20%',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginVertical: 2,
        marginHorizontal: 5,
    },
    sleepDetailsContainer: {
       width: '70%',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        marginVertical: 2,
        marginHorizontal: 5
    },
    sleepDetails: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginVertical: 1,
    },
    icon: {
        justifyContent: 'center',
    },
    sleepTextDetail: {
        width: 90,
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center'
    },
    row: {
        marginVertical: 0,
    },
    rowText: {
        fontSize: 14,
        color: '#333333',
        paddingLeft: 10,
        marginRight: 5,
        textAlignVertical: 'center'
    },

})
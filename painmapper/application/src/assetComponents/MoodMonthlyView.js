import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/AntDesign'
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
            dates.push(day.toJSON().slice(0, 10));
        }
        this.setState({ selectedMonthDatesStrings: dates })
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    async getMonthlyMoodDetails(month) {

        await this.setMonthDates(month);

        let user = firebase.auth().currentUser
        let monthDays = this.state.selectedMonthDatesStrings;
        let moodDays = [];
        let moodByDays = [];
        let daysOfMonth = [];
        monthDays.forEach(function (item) {
            db
                .collection("users")
                .doc(user.uid)
                .collection("mood")
                .doc(item)
                .get()
                .then(doc => {
                    let date, dateString, mood, moodDetail, moodString;
                    let object;

                    if (doc.exists) {
                        date = doc.data().selectedDate
                        dateString = item
                        mood = doc.data().selectedMood
                        moodString = doc.data().selectedMoodString
                        moodDetail = doc.data().selectedMoodDetails
                        object = {
                            date,
                            dateString,
                            mood,
                            moodString,
                            moodDetail
                        }
                        moodDays.push(object)
                        moodDays.sort(function (a, b) {
                            return a.date - b.date;
                        });
                    } else {
                        dateString = item
                        date = new Date(item);
                        mood = 0,
                            moodString = "No mood recorded"
                        moodDetail = ""
                        object = {
                            date,
                            dateString,
                            mood,
                            moodString,
                            moodDetail
                        }
                        moodDays.push(object)
                        moodDays.sort(function (a, b) {
                            return a.date - b.date;
                        });
                        console.log("No such document!");
                    }
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
        })
        // needs to wait on promise results

        await this.delay(500);
        moodDays.forEach(function (item) {
            var options = { weekday: 'long' };
            daysOfMonth.push(new Intl.DateTimeFormat('en-US', options).format(item.date).slice(0, 1));
            moodByDays.push(item.mood);
        })

        await this.delay(500);
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
        this.getMoodDetails(prevMonthString)
    }

    setNextMonth() {
        var nextMonth = new Date(this.state.selectedDate.getTime() + 7 * 864e5);
        this.setState({ selectedMonth: nextMonth })
        var nextMonthString = nextMonth.toJSON().slice(0, 10);
        this.setState({ selectedMonthString: nextMonthString });
        this.getMoodDetails(nextMonthString)
    }

    componentWillMount() {
        this.getMonthlyMoodDetails(this.state.selectedMonth)
    }

    render() {
        const monthlyView = this.state.monthlyStats.map(item => {
            return (
                <View style={styles.row} key={item.dateString}>
                    <Text style={styles.dateString}>
                        {item.dateString}
                    </Text>
                    <View style={styles.moodDetails}>
                        <MoodIcon offset={item.mood} style={styles.icon}/>
                        <View  style={styles.moodTextDetail}>
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
                        width={Dimensions.get('window').width} // from react-native
                        height={220}
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
                            marginVertical: 8,
                            borderRadius: 16
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
        paddingLeft: 10
    },
    row: {
        marginVertical: 0,
    },
    rowText: {
        fontSize: 14,
        color: '#333333',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
})
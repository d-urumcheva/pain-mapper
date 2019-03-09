import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import firebase from 'react-native-firebase'
import MoodIcon from '../components/MoodIcon';

var db = firebase.firestore();

export default class MoodWeeklyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedWeek: new Date(),
            selectedWeekDatesStrings: [],
            weeklyStats: [],
            isLoading: true,
            moodByDays: [],
            daysOfWeek: []
        };

        this.getWeeklyMoodDetails = this.getWeeklyMoodDetails.bind(this);
    }

    async setWeekDates(week) {
        let dates = [];
        let day = week;
        dates.push(day.toJSON().slice(0, 10));
        for (var i = 0; i < 6; i++) {
            day = new Date(day.getTime() - 864e5);
            dates.unshift(day.toJSON().slice(0, 10));
        }
        this.setState({ selectedWeekDatesStrings: dates })
    }

    async getWeeklyMoodDetails(week) {

        await this.setWeekDates(week);

        let user = firebase.auth().currentUser
        let weekDays = this.state.selectedWeekDatesStrings;
        let moodDays = [];
        let moodByDays = [];
        let daysOfWeek = [];

        let promises = weekDays.map(function (item) {
            return db
                .collection("users")
                .doc(user.uid)
                .collection("mood")
                .doc(item)
                .get()
                .then(doc => {
                    let date, dateString, mood, moodDetail, moodString, isMoodRecorded;
                    let object;

                    if (doc.exists) {
                        date = doc.data().selectedDate
                        dateString = item
                        mood = doc.data().selectedMood
                        moodString = doc.data().selectedMoodString
                        moodDetail = doc.data().selectedMoodDetails
                        isMoodRecorded = true
                        object = {
                            date,
                            dateString,
                            mood,
                            moodString,
                            moodDetail,
                            isMoodRecorded
                        }
                    } else {
                        dateString = item
                        date = new Date(item);
                        mood = 0,
                            moodString = "No mood recorded"
                        moodDetail = ""
                        isMoodRecorded = false
                        object = {
                            date,
                            dateString,
                            mood,
                            moodString,
                            moodDetail,
                            isMoodRecorded
                        }
                        console.log("No such document!");
                    }

                    return object;
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
        })

        moodDays = await Promise.all(promises)
            .then(values => {
                console.log('Success!')
            })
            .catch(error => {
                console.log(error.message)
            });

        for (let i = 0; i < moodDays.length; i++) {
            var options = { weekday: 'long' };
            daysOfWeek.push(new Intl.DateTimeFormat('en-US', options).format(moodDays[i].date).slice(0, 3));
            moodByDays.push(moodDays[i].mood);
        }

        this.setState({
            weeklyStats: moodDays,
            isLoading: false,
            moodByDays: moodByDays,
            daysOfWeek: daysOfWeek
        })
    }

    setPreviousWeek() {
        var prevWeek = new Date(this.state.selectedDate.getTime() - 7 * 864e5);
        this.setState({ selectedWeek: prevWeek })

        var prevWeekString = prevWeek.toJSON().slice(0, 10);
        this.setState({ selectedWeekString: prevWeekString });
        this.getMoodDetails(prevWeekString)
    }

    setNextWeek() {
        var nextWeek = new Date(this.state.selectedDate.getTime() + 7 * 864e5);
        this.setState({ selectedWeek: nextWeek })
        var nextWeekString = nextWeek.toJSON().slice(0, 10);
        this.setState({ selectedWeekString: nextWeekString });
        this.getMoodDetails(nextWeekString)
    }

    componentWillMount() {
        this.getWeeklyMoodDetails(this.state.selectedWeek)
    }

    render() {
        const weeklyView = this.state.weeklyStats.map(item => {
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
                                    Feeling {item.moodString}
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
                    {console.log(this.state)}
                    <LineChart
                        data={{
                            labels: this.state.daysOfWeek,
                            datasets: [{
                                data: this.state.moodByDays
                            }]
                        }}
                        width={Dimensions.get('window').width} // from react-native
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
                    {weeklyView}
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
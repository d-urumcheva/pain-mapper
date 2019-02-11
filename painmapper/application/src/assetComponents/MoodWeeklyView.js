import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import LineChart from 'react-native-responsive-linechart';
import Icon from 'react-native-vector-icons/AntDesign'
import firebase from 'react-native-firebase'

var db = firebase.firestore();

const data = [100, 10, 20, 30, 50];
const config = {
  line: {
    strokeWidth: 1,
    strokeColor: "#216D99"
  },
  area: {
    gradientFrom: "#2e86de",
    gradientFromOpacity: 1,
    gradientTo: "#87D3FF",
    gradientToOpacity: 1
  },
  yAxis: {
    labelColor: "#c8d6e5"
  },
  grid: {
    strokeColor: "#c8d6e5",
    stepSize: 30
  },
  insetY: 10,
  insetX: 10,
  interpolation: "spline",
  backgroundColor: "#fff"
};


export default class MoodWeeklyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedWeek: new Date(),
            selectedWeekDatesStrings: [],
            weeklyStats: []
        }
    }

    
    getWeeklyMoodDetails(week) {
        let user = firebase.auth().currentUser
        let weekDays = week;
        let moodDays = [];
        weekDays.forEach(function (item) {
            db
                .collection("users")
                .doc(user.uid)
                .collection("mood")
                .doc(item)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        let date = doc.data().selectedDate
                        let mood = doc.data().selectedMood
                        let moodDetail = doc.data().selectedMoodDetails
                        let object = {
                            date,
                            item,
                            mood,
                            moodDetail
                        }
                        moodDays.push(object)
                        moodDays.sort(function (a, b) {
                            return a.date - b.date;
                        });
                    } else {
                        let date = item
                        let mood = -1
                        let moodDetail = "no details"
                        let object = {
                            date,
                            item,
                            mood,
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
        this.setState({ weeklyStats: moodDays })


    }

    setWeekDates(week) {
        let dates = [];
        let day = week;
        dates.push(day.toJSON().slice(0, 10));
        for (var i = 0; i < 6; i++) {
            day = new Date(day.getTime() - 864e5);
            dates.push(day.toJSON().slice(0, 10));
        }
        this.setState({ selectedWeekDatesStrings: dates })
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
        this.setWeekDates(this.state.selectedWeek);
        this.getWeeklyMoodDetails(this.state.selectedWeekDatesStrings)
    }

    render() {
        return (
                <LineChart style={{ flex: 1 }} config={config} data={data} />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, scrollContainer: {
        flex: 1,
        backgroundColor: 'steelblue'
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'steelblue',
        paddingLeft: 3,
        paddingVertical: 2
    },

})
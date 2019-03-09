import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import firebase from 'react-native-firebase';

var db = firebase.firestore();

export default class PainWeeklyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedWeek: new Date(),
            selectedWeekDatesStrings: [],
            isLoading: true,
            daysOfWeek: [],
            painByDays: [],
            arthritisByDay: [],
            backPainByDay: [],
            endometriosisByDay: [],
            fibromyalgiaByDay: [],
            ibsByDay: [],
            migraineByDay: [],
        };

        this.getWeeklyPainDetails = this.getWeeklyPainDetails.bind(this);
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

    async getWeeklyPainDetails(week) {

        await this.setWeekDates(week);

        let user = firebase.auth().currentUser
        let weekDays = this.state.selectedWeekDatesStrings;
        let daysOfWeek = [];
        let painByDays = [];
        let arthritisByDay = [];
        let backPainByDay = [];
        let endometriosisByDay = [];
        let fibromyalgiaByDay = [];
        let ibsByDay = [];
        let migraineByDay = [];
        let promises = weekDays.map(function (item) {
            return db
                .collection("users")
                .doc(user.uid)
                .collection("pain")
                .doc(item)
                .get()
                .then(doc => {
                    let date, dateString, overallPain, isPainRecorded,
                        arthritisIntensity, backPainIntensity, endometriosisIntensity,
                        fibromyalgiaIntensity, ibsIntensity, migraineIntensity;
                    let object;

                    if (doc.exists) {
                        date = doc.data().selectedDate
                        dateString = item
                        isPainRecorded = true
                        overallPain = doc.data().pain
                        arthritisIntensity = doc.data().pain[0].intensity
                        backPainIntensity = doc.data().pain[1].intensity
                        endometriosisIntensity = doc.data().pain[2].intensity
                        fibromyalgiaIntensity = doc.data().pain[3].intensity
                        ibsIntensity = doc.data().pain[4].intensity
                        migraineIntensity = doc.data().pain[5].intensity
                        object = {
                            date,
                            dateString,
                            isPainRecorded,
                            overallPain,
                            arthritisIntensity,
                            backPainIntensity,
                            endometriosisIntensity,
                            fibromyalgiaIntensity,
                            ibsIntensity,
                            migraineIntensity
                        }
                        console.log(object);
                    } else {
                        dateString = item
                        date = new Date(item);
                        isPainRecorded = false
                        overallPain = []
                        arthritisIntensity = 0
                        backPainIntensity = 
                        endometriosisIntensity = 0
                        fibromyalgiaIntensity = 0
                        ibsIntensity = 0
                        migraineIntensity = 0
                        object = {
                            date,
                            dateString,
                            isPainRecorded,
                            overallPain,
                            arthritisIntensity,
                            backPainIntensity,
                            endometriosisIntensity,
                            fibromyalgiaIntensity,
                            ibsIntensity,
                            migraineIntensity
                        }
                        console.log("No such document!");
                    }

                    return object;
                })
                .catch(function (error) {
                    console.log("Error getting document:", error);
                });
        })

        painDays = await Promise.all(promises);

        for (let i = 0; i < painDays.length; i++) {
            var options = { weekday: 'long' };
            daysOfWeek.push(new Intl.DateTimeFormat('en-US', options).format(painDays[i].date).slice(0, 3));
            painByDays.push(painDays[i].overallPain);
            arthritisByDay.push(painDays[i].arthritisIntensity);
            backPainByDay.push(painDays[i].backPainIntensity);
            endometriosisByDay.push(painDays[i].endometriosisIntensity);
            fibromyalgiaByDay.push(painDays[i].fibromyalgiaIntensity);
            ibsByDay.push(painDays[i].ibsIntensity);
            migraineByDay.push(painDays[i].migraineIntensity);
        }

        this.setState({
            isLoading: false,
            daysOfWeek: daysOfWeek,
            painByDays: painByDays,
            arthritisByDay: arthritisByDay,
            backPainByDay: backPainByDay,
            endometriosisByDay: endometriosisByDay,
            fibromyalgiaByDay: fibromyalgiaByDay,
            ibsByDay: ibsByDay,
            migraineByDay: migraineByDay,
        })
    }

    setPreviousWeek() {
        var prevWeek = new Date(this.state.selectedDate.getTime() - 7 * 864e5);
        this.setState({ selectedWeek: prevWeek })
        var prevWeekString = prevWeek.toJSON().slice(0, 10);
        this.setState({ selectedWeekString: prevWeekString });

    }

    setNextWeek() {
        var nextWeek = new Date(this.state.selectedDate.getTime() + 7 * 864e5);
        this.setState({ selectedWeek: nextWeek })
        var nextWeekString = nextWeek.toJSON().slice(0, 10);
        this.setState({ selectedWeekString: nextWeekString });
    }

    componentWillMount() {
        this.getWeeklyPainDetails(this.state.selectedWeek)
    }

    render() {
        const weeklyView = this.state.selectedWeekDatesStrings.map((item, index) => {
            return (
                <View style={styles.row} key={index}>
                    <Text style={styles.dateString}>
                        {item}
                    </Text>
                    <View style={styles.painDetails}>
                        <View style={styles.moodTextDetail}>
                            <Text style={styles.rowText}>
                                <Text style={styles.left}>
                                    <Text style={{ color: `rgb(134, 65, 244)`, fontWeight: 'bold', marginRight: 10 }} >
                                        arthritis:
                                    </Text>
                                    {this.state.arthritisByDay[index]}
                                </Text>
                                <Text style={styles.right}>
                                    <Text style={{ color: `rgb(2, 65, 100)`, marginRight: 8 }} >
                                        back pain:
                                    </Text>
                                    {this.state.backPainByDay[index]}
                                </Text>
                            </Text>
                            <Text style={styles.rowText}>
                                <Text style={styles.left}>
                                    <Text style={{ color: `rgb(2, 65, 100)`, marginRight: 8 }} >
                                        endometriosis:
                                    </Text>
                                    {this.state.endometriosisByDay[index]}
                                </Text>
                                <Text style={styles.right}>
                                    <Text style={{ color: `rgb(134, 65, 244)`, fontWeight: 'bold', paddingRight: 10 }} >
                                        fibromyalgia:
                                    </Text>
                                    {this.state.fibromyalgiaByDay[index]}
                                </Text>
                            </Text>
                            <Text style={styles.rowText}>
                                <Text style={styles.left}>
                                    <Text style={{ color: `rgb(2, 65, 100)`, marginRight: 8 }} >
                                        ibs:
                                    </Text>
                                    {this.state.ibsByDay[index]}
                                </Text>
                                <Text style={styles.right}>
                                    <Text style={{ color: `rgb(134, 65, 244)`, fontWeight: 'bold', marginRight: 10 }} >
                                        migraine:
                                    </Text>
                                    {this.state.migraineByDay[index]}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            );
            // }
        })

        { console.log(this.state) }
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
                            labels: this.state.daysOfWeek,
                            datasets: [{
                                data: this.state.arthritisByDay,
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                            },
                            {
                                data: this.state.backPainByDay,
                                color: (opacity = 1) => `rgba(2, 65, 100, ${opacity})`,
                            },
                            {
                                data: this.state.endometriosisByDay,
                                color: (opacity = 1) => `rgba(2, 65, 100, ${opacity})`,
                            },
                            {
                                data: this.state.fibromyalgiaByDay,
                                color: (opacity = 1) => `rgba(2, 65, 100, ${opacity})`,
                            },
                            {
                                data: this.state.ibsByDay,
                                color: (opacity = 1) => `rgba(2, 65, 100, ${opacity})`,
                            },
                            {
                                data: this.state.migraineByDay,
                                color: (opacity = 1) => `rgba(2, 65, 100, ${opacity})`,
                            },
                            ]
                        }}
                        width={Dimensions.get('window').width}
                        height={230}
                        withInnerLines={false}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
    painDetails: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 55,
        backgroundColor: '#ffffff',
        marginVertical: 1,
    },
    row: {
        marginVertical: 5,
    },
    rowText: {
        justifyContent: 'space-between',
        fontSize: 14,
        color: '#333333',
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
    left: {
        paddingRight: 20, 
        width: Dimensions.get('window').width /2 - 10
    },  
    right: {
        paddingLeft: 10, 
        width: Dimensions.get('window').width /2 - 10
    }    

})
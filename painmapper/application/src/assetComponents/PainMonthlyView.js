import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import firebase from 'react-native-firebase';

var db = firebase.firestore();

export default class PainMonthlyView extends Component {

    constructor() {
        super()
        this.state = {
            selectedMonth: new Date(),
            selectedMonthDatesStrings: [],
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

        this.getMonthlyPainDetails = this.getMonthlyPainDetails.bind(this);
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

    async getMonthlyPainDetails(month) {

        await this.setMonthDates(month);

        let user = firebase.auth().currentUser
        let monthDays = this.state.selectedMonthDatesStrings;
        let daysOfWeek = [];
        let painByDays = [];
        let arthritisByDay = [];
        let backPainByDay = [];
        let endometriosisByDay = [];
        let fibromyalgiaByDay = [];
        let ibsByDay = [];
        let migraineByDay = [];
        let promises = monthDays.map(function (item) {
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
            daysOfWeek.push(new Intl.DateTimeFormat('en-US', options).format(painDays[i].date).slice(0, 1));
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
        this.getMonthlyPainDetails(this.state.selectedMonth)
    }

    render() {
        const monthlyView = this.state.selectedMonthDatesStrings.map((item, index) => {
            return (
                <View style={styles.row} key={index}>
                    <Text style={styles.dateString}>
                        {item}
                    </Text>
                    <View style={styles.painDetails}>
                            <Text style={styles.rowText}>
                                <Text style={styles.left}>
                                    <Text style={{ color: `rgb(134, 65, 244)`, fontWeight: 'bold', marginRight: 10 }} >
                                        arthritis:
                                    </Text>
                                    {this.state.arthritisByDay[index]}
                                </Text>
                                <Text style={styles.right}>
                                    <Text style={{ color: `rgb(6, 147, 227)`, fontWeight: 'bold', marginRight: 10 }} >
                                        back pain:
                                    </Text>
                                    {this.state.backPainByDay[index]}
                                </Text>
                            </Text>
                            <Text style={styles.rowText}>
                                <Text style={styles.left}>
                                    <Text style={{ color: `rgb(247, 141, 167)`, fontWeight: 'bold', marginRight: 10 }} >
                                        endometriosis:
                                    </Text>
                                    {this.state.endometriosisByDay[index]}
                                </Text>
                                <Text style={styles.right}>
                                    <Text style={{ color: `rgb(255, 193, 7)`, fontWeight: 'bold', paddingRight: 10 }} >
                                        fibromyalgia:
                                    </Text>
                                    {this.state.fibromyalgiaByDay[index]}
                                </Text>
                            </Text>
                            <Text style={styles.rowText}>
                                <Text style={styles.left}>
                                    <Text style={{ color: `rgb(139, 195, 74)`, fontWeight: 'bold', marginRight: 10 }} >
                                        ibs:
                                    </Text>
                                    {this.state.ibsByDay[index]}
                                </Text>
                                <Text style={styles.right}>
                                    <Text style={{ color: `rgb(255, 105, 0)`, fontWeight: 'bold', marginRight: 10 }} >
                                        migraine:
                                    </Text>
                                    {this.state.migraineByDay[index]}
                                </Text>
                            </Text>
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
                    <ScrollView style={styles.horizontalScrollChart}
                    pagingEnabled={true}
                    horizontal={true}
                    >
                    <View>

                    <LineChart
                        data={{
                            labels: this.state.daysOfWeek,
                            datasets: [
                            {
                                data: this.state.arthritisByDay,
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                            },
                            {
                                data: this.state.backPainByDay,
                                color: (opacity = 1) => `rgba(6, 147, 227, ${opacity})`,
                            },
                            {
                                data: this.state.endometriosisByDay,
                                color: (opacity = 1) => `rgba(247, 141, 167, ${opacity})`,
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
                        </View>
                    <View>

                    <LineChart
                        data={{
                            labels: this.state.daysOfWeek,
                            datasets: [
                            {
                                data: this.state.fibromyalgiaByDay,
                                color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
                            },
                            {
                                data: this.state.ibsByDay,
                                color: (opacity = 1) => `rgba(139, 195, 74, ${opacity})`,
                            },
                            {
                                data: this.state.migraineByDay,
                                color: (opacity = 1) => `rgba(255, 105, 0, ${opacity})`,
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
                        </View>
                        </ScrollView>
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
    horizontalScrollChart: {
        height: 230
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
        fontSize: 14,
        width: '90%',
        color: '#333333',
        paddingHorizontal: 10,
    },
    left: {
        paddingRight: 20, 
        width: '45%'
    },  
    right: {
        paddingLeft: 10, 
        width: Dimensions.get('window').width /2 - 10
    }    

})
import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const days = ['mon', 'tue', 'wed', 'thu', 'fri'];

export default class SectionScheduleView extends Component {
    render() {
        const { selectedSection } = this.props;
        const schedules = selectedSection.schedules;

        let finalSchedules = [];
        let subjects = [];

        for (let schedule of schedules) {
            let currentTime = `${schedule.time_start}-${schedule.time_end}`;
            let findSchedule = finalSchedules.findIndex((item) => item.time === currentTime);

            if (findSchedule < 0) {
                finalSchedules.push({
                    time: currentTime
                });

                findSchedule = finalSchedules.length - 1;
            } else {
                finalSchedules[findSchedule]["time"] = currentTime;
            }

            for (let day of days) {
                let scheduleDays = JSON.parse(schedule.days);
                let findDay = scheduleDays.findIndex((item) => item === day);

                if (findDay < 0) {
                    continue;
                }

                finalSchedules[findSchedule][day] = String(schedule.subject.code);
            }

            // Check subject
            let subjectIndex = subjects.findIndex((subject) => {
                return subject.code === schedule.subject.code;
            });

            if (subjectIndex < 0) {
                subjects.push(schedule.subject);
            }
        }

        return (
            <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 15, minWidth: 100, textAlign: 'center' }}>{selectedSection.name.toUpperCase()}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={{ width: 40, marginLeft: 15 }}>Time</Text>
                        <Text style={styles.textStyle}>Mon</Text>
                        <Text style={styles.textStyle}>Tue</Text>
                        <Text style={styles.textStyle}>Wed</Text>
                        <Text style={styles.textStyle}>Thu</Text>
                        <Text style={styles.textStyle}>Fri</Text>
                    </View>

                    <ScrollView>

                        {finalSchedules.map((schedule, i) => {
                            let oneSubject = false;

                            if (schedule.mon === 'RECESS') {
                                return (
                                    <View style={styles.row} key={i}>
                                        <Text style={{ maxWidth: 75, fontSize: 13 }} adjustsFontSizeToFit={true}>{schedule.time}</Text>
                                        <Text style={styles.textStyle}>R</Text>
                                        <Text style={styles.textStyle}>E</Text>
                                        <Text style={styles.textStyle}>C</Text>
                                        <Text style={styles.textStyle}>E</Text>
                                        <Text style={styles.textStyle}>SS</Text>
                                    </View>
                                )
                            }

                            if (schedule.mon === 'LUNCH') {
                                return (
                                    <View style={styles.row} key={i}>
                                        <Text style={{ maxWidth: 75, fontSize: 13 }} adjustsFontSizeToFit={true}>{schedule.time}</Text>
                                        <Text style={styles.textStyle}>L</Text>
                                        <Text style={styles.textStyle}>U</Text>
                                        <Text style={styles.textStyle}>N</Text>
                                        <Text style={styles.textStyle}>C</Text>
                                        <Text style={styles.textStyle}>H</Text>
                                    </View>
                                )
                            }

                            return (
                                <View style={styles.row} key={i}>
                                    <Text style={{ maxWidth: 75, fontSize: 13 }} adjustsFontSizeToFit={true}>{schedule.time}</Text>
                                    <Text style={styles.textStyle}>{schedule.mon}</Text>
                                    <Text style={styles.textStyle}>{schedule.tue}</Text>
                                    <Text style={styles.textStyle}>{schedule.wed}</Text>
                                    <Text style={styles.textStyle}>{schedule.thu}</Text>
                                    <Text style={styles.textStyle}>{schedule.fri}</Text>
                                </View>
                            )
                        })}

                        <View style={styles.legendTitle}>
                            <Text style={{ fontSize: 15, minWidth: 100, textAlign: 'center' }}>LEGENDS</Text>
                        </View>

                        <View style={styles.legendContainer}>
                            {subjects.map((subject, i) => {
                                return <Text key={i}>{`${subject.code} - ${subject.name}`}</Text>
                            })}
                        </View>
                    </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'

    },
    headerTitle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        maxHeight: 30,
        backgroundColor: '#ffdb69'
    },
    legendTitle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        maxHeight: 30,
        backgroundColor: '#ffc36d'
    },
    legendContainer: {
        flex: 1
    },
    header: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 0,
        maxHeight: 40,
        backgroundColor: '#ff4d4d'
    },
    rows: {
        flex: 11,
        flexDirection: 'column',
    },
    row: {
        flex: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    textStyle: {
        width: 50,
        textAlign: 'center',
        fontSize: 12
    },
    textStyle2: {
        textAlign: 'center'
    }
});
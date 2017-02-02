import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SectionScheduleView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>Time</Text>
                    <Text>Mon</Text>
                    <Text>Tue</Text>
                    <Text>Wed</Text>
                    <Text>Thu</Text>
                    <Text>Fri</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        flex: 6,
        flexDirection: 'row',
        height: 40
    },
    row: {
        flex: 6,
        flexDirection: 'row',
        height: 30
    }
});
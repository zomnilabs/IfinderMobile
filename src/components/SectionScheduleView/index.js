import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

export default class SectionScheduleView extends Component {
    render() {
        const { selectedSection } = this.props;

        return (
            <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{ fontSize: 20 }}>{selectedSection.name.toUpperCase()}</Text>
                    </View>

                    <View style={styles.header}>
                        <Text style={{ width: 40, marginLeft: 15 }}>Time</Text>
                        <Text>Mon</Text>
                        <Text>Tue</Text>
                        <Text>Wed</Text>
                        <Text>Thu</Text>
                        <Text>Fri</Text>
                    </View>

                    <ScrollView horizontal={true}
                                style={{ height: 300 }}
                                contentContainerStyle={styles.rows}>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true}>7:30-8:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ maxWidth: 60 }} adjustsFontSizeToFit={true} minimumFontScale={0.3}>7:30-10:30</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>AP</Text>
                            <Text>ESP</Text>
                            <Text>HR</Text>
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
        paddingBottom: 20,
        maxHeight: 50
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
        minHeight: 35,
        maxHeight: 45
    }
});
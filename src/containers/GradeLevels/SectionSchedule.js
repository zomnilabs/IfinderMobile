import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, NetInfo, StatusBar } from 'react-native';
import ScheduleView from '../../components/SectionScheduleView';

class SectionSchedule extends Component {
    render() {
        const { selectedSection } = this.props;

        return (
            <View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />

                <ScheduleView selectedSection={selectedSection} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 60
    },
    header: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'lightgray',
        backgroundColor: '#03A9F4',
        borderBottomWidth: 1
    }
});

const mapStateToProps = state => ({
    status: state.gradeLevels.status
});

export default connect(mapStateToProps, {

})(SectionSchedule);

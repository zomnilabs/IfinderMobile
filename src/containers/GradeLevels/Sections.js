import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, NetInfo, StatusBar } from 'react-native';
import List from '../../components/List';
import BuildingItem from '../../components/BuildingItem';
import { syncGradeLevels } from '../../actions/gradeLevels';
import { Actions } from 'react-native-router-flux';

class Sections extends Component {
    componentWillMount() {
        NetInfo.addEventListener('change', (reach) =>
            reach !== 'none' && this.props.onRefresh({silent: true})
        );
    }

    render() {
        const { selectedGradeLevel, status, onRefresh } = this.props;

        return (
            <View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />

                <List
                    items={selectedGradeLevel.sections}
                    status={status}
                    renderItem={item => <BuildingItem {...item} />}
                    onItemSelect={this.onToggle.bind(this)}
                    placeholder="There are no rooms on this building"
                    onRefresh={onRefresh}
                />
            </View>
        );
    }

    onToggle(item) {
        Actions.sectionSchedulePage({ selectedSection: item });
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
    onRefresh: syncGradeLevels,
})(Sections);

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, NetInfo, StatusBar } from 'react-native';
import List from '../../components/List';
import BuildingItem from '../../components/BuildingItem';
import { syncGradeLevels } from '../../actions/gradeLevels';
import { Actions } from 'react-native-router-flux';

class GradeLevels extends Component {
    componentWillMount() {
        NetInfo.addEventListener('change', (reach) =>
            reach !== 'none' && this.props.onRefresh({silent: true})
        );
    }

    render() {
        const {gradeLevels, status, onRefresh} = this.props;

        return (
            <View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />

                <List
                    items={gradeLevels.items}
                    status={status}
                    renderItem={item => <BuildingItem {...item} />}
                    onItemSelect={this.onToggle.bind(this)}
                    placeholder="There are no grade levels yet"
                    onRefresh={onRefresh}
                />
            </View>
        );
    }

    onToggle(item) {
        Actions.sectionsPage({ selectedGradeLevel: item });
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
    gradeLevels: state.gradeLevels,
    status: state.gradeLevels.status
});

export default connect(mapStateToProps, {
    onRefresh: syncGradeLevels
})(GradeLevels);

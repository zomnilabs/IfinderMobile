import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text,
    NetInfo, StatusBar, Button } from 'react-native';
import List from '../../components/List';
import BuildingItem from '../../components/BuildingItem';
import { syncFaculties, saveFaculty } from '../../actions/faculties';
import { Actions } from 'react-native-router-flux';

class Faculties extends Component {
    componentWillMount() {
        NetInfo.addEventListener('change', (reach) =>
            reach !== 'none' && this.props.onRefresh({silent: true})
        );
    }

    render() {
        const {faculties, status, onRefresh} = this.props;
        console.log(faculties);
        return (
            <View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />

                <List
                    items={faculties.items}
                    status={status}
                    renderItem={item => <BuildingItem {...item} />}
                    onItemSelect={this.onToggle.bind(this)}
                    placeholder="There are no faculties yet"
                    onRefresh={onRefresh}
                />
            </View>
        );
    }

    onToggle(item) {
        // Actions.roomPage({ selectedBuilding: item });
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
    faculties: state.faculties,
    status: state.faculties.status
});

export default connect(mapStateToProps, {
    onRefresh: syncFaculties,
    saveFaculty
})(Faculties);

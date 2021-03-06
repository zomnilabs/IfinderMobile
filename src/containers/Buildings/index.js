import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text,
    NetInfo, StatusBar, Button } from 'react-native';
import List from '../../components/List';
import BuildingItem from '../../components/BuildingItem';
import { syncBuildings, saveBuilding } from '../../actions/buildings';
import { Actions } from 'react-native-router-flux';

class Buildings extends Component {
    handleViewSiteMap = (e) => {
        Actions.roomPage({ selectedBuilding: null });
    };

    componentWillMount() {
        NetInfo.addEventListener('change', (reach) =>
            reach !== 'none' && this.props.onRefresh({silent: true})
        );
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(
            'change',
            (reach) => reach !== 'none' && this.props.onRefresh({silent: true})
        );
    }

    render() {
        const {buildings, status, onRefresh} = this.props;

        return (
            <View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />

                <Button onPress={this.handleViewSiteMap}
                        color="grey"
                        title={`View Site Map`} />

                <List
                    items={buildings.items}
                    status={status}
                    renderItem={item => <BuildingItem {...item} />}
                    onItemSelect={this.onToggle.bind(this)}
                    placeholder="There are no buildings yet"
                    onRefresh={onRefresh}
                />
            </View>
        );
    }

    onToggle(item) {
        Actions.roomPage({ selectedBuilding: item });
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
    buildings: state.buildings,
    status: state.buildings.status
});

export default connect(mapStateToProps, {
    onRefresh: syncBuildings,
    saveBuilding
})(Buildings);

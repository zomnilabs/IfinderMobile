import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StyleSheet, Text, NetInfo, StatusBar } from 'react-native';
import List from '../../components/List';
import BuildingItem from '../../components/BuildingItem';
import MapView from '../../components/MapView';
import { syncBuildings } from '../../actions/buildings';

class Rooms extends Component {
    state = {
        showMap: false,
        selectedItem: null
    };

    componentWillMount() {
        NetInfo.addEventListener('change', (reach) =>
            reach !== 'none' && this.props.onRefresh({silent: true})
        );
    }

    render() {
        if (this.state.showMap &&
            this.state.selectedItem !== null) {

            return this.renderMapView();
        }

        return this.renderRoomList();
    }

    renderRoomList() {
        const { selectedBuilding, status, onRefresh } = this.props;

        return (
            <View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />

                <List
                    items={selectedBuilding.rooms}
                    status={status}
                    renderItem={item => <BuildingItem {...item} />}
                    onItemSelect={this.onToggle.bind(this)}
                    placeholder="There are no rooms on this building"
                    onRefresh={onRefresh}
                />
            </View>
        );
    }

    renderMapView() {
        return (
            <View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />

                <MapView image_map={this.state.selectedItem.image_map} />
            </View>
        )
    };

    onToggle(item) {
        console.log(item);

        this.setState({
            selectedItem: item,
            showMap: true
        })
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
    status: state.buildings.status
});

export default connect(mapStateToProps, {
    onRefresh: syncBuildings,
})(Rooms);

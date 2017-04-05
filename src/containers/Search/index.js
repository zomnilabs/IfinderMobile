import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import SearchBar from 'react-native-searchbar';
import { connect } from 'react-redux';
import List from '../../components/OfflineList';
import MultiItem from '../../components/MultiItem';
import { Actions } from 'react-native-router-flux';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            items: null
        };
    }

    _handleResults = (results) => {
        this.setState({ results });

        console.log(results);
    }

    _onToggle = (item) => {
        if (item.sections) {
            Actions.sectionsPage({ selectedGradeLevel: item });
            return;
        }

        if (item.rooms) {
            Actions.roomPage({ selectedBuilding: item });
            return;
        }

        if (item.schedules) {
            Actions.sectionSchedulePage({ selectedSection: item });
            return;
        }

        if (item.people) {
            Actions.personPage({ selectedFaculty: item });
        }
    };

    componentDidMount() {
        this.searchBar.show();
    }

    render() {
        const { buildings, gradeLevels, faculties } = this.props;
        let items = [...buildings.items, ...gradeLevels.items, ...faculties.items];

        for (let gradeLevel of gradeLevels.items) {
            items.push(...gradeLevel.sections);
        }

        console.log(items);

        return (
            <View style={styles.container}>
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={items}
                    handleResults={this._handleResults}
                    showOnLoad
                    onBack={() => {}}
                />

                <List
                    items={this.state.results}
                    renderItem={item => <MultiItem {...item} />}
                    onItemSelect={this._onToggle}
                    placeholder="There are no data yet"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    }
});

const mapStateToProps = state => ({
    buildings: state.buildings,
    gradeLevels: state.gradeLevels,
    faculties: state.faculties
});

export default connect(mapStateToProps, {})(Search);
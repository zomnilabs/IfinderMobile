import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { Actions, Router, Scene } from 'react-native-router-flux';

// const ConnectedRouter = connect()(Router);

import Main from './containers/Main';
import Search from './containers/Search';
import Buildings from './containers/Buildings';
import Rooms from './containers/Buildings/Rooms';

import GradeLevels from './containers/GradeLevels';
import Sections from './containers/GradeLevels/Sections';
import SectionSchedule from './containers/GradeLevels/SectionSchedule';

import Faculties from './containers/Faculties';
import Persons from './containers/Faculties/Persons';
import FacultySchedule from './containers/Faculties/FacultySchedule';

const scenes = Actions.create(
    <Scene key="root">
        <Scene key="mainPage" component={Main} title="iFinder" initial={true} />
        <Scene key="searchPage" component={Search} />
        <Scene key="buildingsPage" title="Buildings" component={Buildings} />
        <Scene key="roomPage" title="Rooms" component={Rooms} direction="vertical" />

        <Scene key="gradeLevelsPage" title="Grade Levels" component={GradeLevels} />
        <Scene key="sectionsPage" title="Sections" component={Sections} direction="vertical" />
        <Scene key="sectionSchedulePage" title="Schedule" component={SectionSchedule} direction="vertical" />

        <Scene key="facultiesPage" title="Faculties" component={Faculties} />
        <Scene key="personPage" title="Faculty Members" component={Persons} />
        <Scene key="facultySchedulePage" title="Schedule" component={FacultySchedule} />
    </Scene>
);

const Routes = () => {
    return (
        <Router navigationBarStyle={styles.navBar}
                leftButtonIconStyle={styles.leftButtonIconStyle}
                titleStyle={styles.navBarTitle}
                scenes={scenes}
        />
    )
};

class App extends Component {
    render() {
        const { status } = this.props;

        if (status.storageLoaded) {
            return <Routes />;
        }

        return <View />;
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#03A9F4'
    },
    navBarTitle: {
        color: '#fff'
    },
    leftButtonIconStyle: {
        tintColor: '#fff'
    }
});

export default connect(state => state)(App);

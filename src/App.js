import React from 'react';
import { Component, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';

// const ConnectedRouter = connect()(Router);

import Main from './containers/Main';
import Buildings from './containers/Buildings';
import Rooms from './containers/Buildings/Rooms';

import GradeLevels from './containers/GradeLevels';
import Sections from './containers/GradeLevels/Sections';

const App = (props) => {
	return props.status.storageLoaded ? <Routes /> : <View />
};

const Routes = () => {
	return (
		<Router navigationBarStyle={styles.navBar}
                leftButtonIconStyle={styles.leftButtonIconStyle}
                titleStyle={styles.navBarTitle}>
			<Scene key="root">
				<Scene key="mainPage" component={Main} title="iFinder" initial={true} />
                <Scene key="buildingsPage" title="Buildings" component={Buildings} />
                <Scene key="roomPage" title="Rooms" component={Rooms} direction="vertical" />

                <Scene key="gradeLevelsPage" title="Grade Levels" component={GradeLevels} />
                <Scene key="sectionsPage" title="Sections" component={Sections} direction="vertical" />
			</Scene>
		</Router>
	)
};

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

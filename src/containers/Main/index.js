import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet,
    Text, StatusBar, Image, Button, Alert, NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { syncBuildings } from '../../actions/buildings';
import { syncGradeLevels } from '../../actions/gradeLevels';

class Main extends Component {
	componentWillMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));

            // Sync Buildings Data
            this.props.syncBuildings();

            // Sync Grade Levels Data
            this.props.syncGradeLevels();
        });
	}

	handleSectionsPress = () => {
        Actions.gradeLevelsPage();
    };

	handleFacultyPress = () => {

    };

    handleBuildingsPress = () => {
        Actions.buildingsPage();
    };

	render() {
		return (
			<View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />
				<View style={styles.header}>
					<Text style={{ color: '#fff' }}>IFinder</Text>
				</View>

                <View style={styles.content}>
                    <Image source={require('./bg.jpg')}
                           style={styles.backgroundImage}>


                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonStyle}>
                                <Button onPress={this.handleSectionsPress}
                                        color="grey"
                                        title={`Sections`} />
                            </View>


                            <View style={styles.buttonStyle}>
                                <Button onPress={this.handleFacultyPress}
                                        color="grey"
                                        title={`Faculty`} />
                            </View>

                            <View style={styles.buttonStyle}>
                            <Button onPress={this.handleBuildingsPress}
                                    color="grey"
                                    title={`Buildings`} />
                            </View>
                        </View>

                    </Image>
                </View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
    content: {
	    flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    buttonStyle: {
	    width: 100,
        marginLeft: 10,
        marginRight: 10
    },
	header: {
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#03A9F4'
		// borderBottomWidth: 1
	}
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {
    syncBuildings,
    syncGradeLevels
})(Main);

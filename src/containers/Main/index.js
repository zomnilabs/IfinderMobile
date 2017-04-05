import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ActivityIndicator,
    Text, StatusBar, Image, Button, Alert, NetInfo } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { syncBuildings } from '../../actions/buildings';
import { syncGradeLevels } from '../../actions/gradeLevels';
import { syncFaculties } from '../../actions/faculties';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

	async componentWillMount() {
        this.setState({ loading: true });

        await NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));

            if (! isConnected) {
                alert('Please connect your mobile phone to internet, to get new and updated data');
                
                return;
            }

            Promise.all([this.props.syncBuildings(),
                this.props.syncGradeLevels(),
                this.props.syncFaculties()]).then((res) => {

                this.setState({ loading: false });
                console.log(res);
            }).catch((error) => {
                this.setState({ loading: false });
                console.log(error)
            });
        });
	}

	handleSectionsPress = () => {
        Actions.gradeLevelsPage();
    };

    handleSearchPress = () => {
        Actions.searchPage();
    };

	handleFacultyPress = () => {
        Actions.facultiesPage();
    };

    handleBuildingsPress = () => {
        Actions.buildingsPage();
    };

	render() {
	    if (this.state.loading) {
	        return (
	            <View style={styles.indicatorContainer}>
                    <ActivityIndicator />
                </View>
            )
        }

		return (
			<View style={styles.pageContainer}>
                <StatusBar backgroundColor="#0288D1" />
				<View style={styles.header}>
					<Text style={{ color: '#fff' }}>IFinder</Text>
				</View>

                <View style={styles.content}>
                    <Image source={require('./bg.jpg')}
                           style={styles.backgroundImage}>

                        <View style={styles.searchBtnContainer}>
                            <Button onPress={this.handleSearchPress}
                                    color="grey"
                                    style={styles.searchBtn}
                                    title={`Search`} />
                        </View>


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
    searchBtnContainer: {
	    marginTop: 10,
        height: 100
    },
    searchBtn: {
	    padding: 20,
        height: 50
    },
	header: {
		height: 44,
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#03A9F4'
		// borderBottomWidth: 1
	},
    indicatorContainer: {
	    flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {
    syncBuildings,
    syncGradeLevels,
    syncFaculties
})(Main);

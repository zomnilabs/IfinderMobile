import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { isNoConnection, isError } from '../../utils/itemSyncUtils';

export default building => (
	<View
  style={[
		isNoConnection(building) && styles.noConnection,
		isError(building) && styles.error,
		styles.row
]}>
		<Text style={[styles.name]}>
			{building.name}
		</Text>
	</View>
);

const styles = StyleSheet.create({
	noConnection: {
		borderLeftColor: 'orange',
		borderLeftWidth: 2
	},
	error: {
		borderLeftColor: 'red',
		borderLeftWidth: 2
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 5,
		marginBottom: 5
	},
	name: {
		width: 100,
		color: 'black'
	},
	completed: {
		textDecorationLine: 'line-through'
	},
	deleteButton: {
		position: 'absolute',
		top: -10,
		right: 0,
		width: 50,
		height: 50
	},
	deleteText: {
		color: 'darkorange',
		fontSize: 20,
		paddingRight: 10,
		paddingLeft: 25,
		paddingTop: 6
	}
});

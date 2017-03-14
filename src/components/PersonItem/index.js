import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { isNoConnection, isError } from '../../utils/itemSyncUtils';

export default person => (
	<View
  style={[
		isNoConnection(person) && styles.noConnection,
		isError(person) && styles.error,
		styles.row
]}>
		<Text style={[styles.name]}>
			{person.full_name}
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
		// justifyContent: 'space-between',
		paddingHorizontal: 5,
		marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
		flex: 1,
		width: null
	},
	name: {
		color: 'black',
		fontSize: 20,
        minWidth: 150,
        textAlign: 'center'
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

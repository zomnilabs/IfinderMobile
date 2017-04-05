import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, ListView, RefreshControl, TouchableOpacity } from 'react-native';

export default class List extends Component {
	constructor(props) {
		super();

		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.state = {
			ds: this.ds.cloneWithRows(props.items)
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			ds: this.ds.cloneWithRows(props.items)
		});
	}

	render() {
		const { style, status} = this.props;

		return <View style={[styles.list]}>

			<ListView
				style={[styles.list, style]}
				enableEmptySections={true}
				dataSource={this.state.ds}
				renderRow={this.renderRow.bind(this)}
				renderHeader={this.renderHeader.bind(this)}
			/>
		</View>;
	}

	renderRow(item) {
		const {renderItem, onItemSelect} = this.props;
		return <TouchableOpacity
			style={[styles.row]}
			onPress={() => onItemSelect && onItemSelect(item)}>
			{renderItem(item)}
		</TouchableOpacity>
	}

	renderHeader() {
		const {offline} = this.props.status || {};
		return offline ? <View style={styles.offline}><Text style={{ minWidth: 200, textAlign: 'center' }}>No Internet Connection</Text></View> : <View/>;
	}
}

List.propTypes = {
	style: PropTypes.number,
	renderItem: PropTypes.func.isRequired,
	onItemSelect: PropTypes.func,
	items: PropTypes.array,
};

const styles = StyleSheet.create({
	list: {
		flex: 1
	},
	row: {
		padding: 10,
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderColor: '#f3f3f3'
	},
	placeholder: {
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	placeholderText: {
		fontSize: 17,
		color: 'gray'
	},
	offline: {
	    flex: 1,
        width: null,
		height: 25,
		backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
	}
});

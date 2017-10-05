import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import logoImg from './images/logo.png';


class Logo extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image source={logoImg} style={styles.image} />
				{/*<Text style={styles.text}>YikGram</Text>*/}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 275,
		height: 375,
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 20,
	}
});

export default Logo;

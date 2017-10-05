import React, { Component, PropTypes } from 'react';
import { StyleSheet, Image } from 'react-native';

import bgImage from './images/wallpaper.jpeg';


class Wallpaper extends Component {
	render() {
		return (
			<Image style={styles.picture} source={bgImage}>
				{this.props.children}
			</Image>
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},
});

export default Wallpaper;

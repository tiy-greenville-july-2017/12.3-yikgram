import React, { Component, PropTypes } from 'react';
import {
	StyleSheet, TouchableOpacity, Text, Animated, Easing, Image, Alert, View
} from 'react-native';
import Dimensions from 'Dimensions';

import spinner from './images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;


class AnimatedButton extends Component {
  state = {
    isLoading: false,
  };

	constructor(props) {
		super(props);

		this.buttonAnimated = new Animated.Value(0);
		this.growAnimated = new Animated.Value(0);
	}

	_onPress = async () => {
    // if we're already loading then bail
    if (this.state.isLoading) return;
		this.setState({ isLoading: true });

		Animated.timing(
			this.buttonAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();

    // Call the submit handler
    await this.props.onSubmit();
		this._onGrow();

    // Reset the screen for backwards navigation
		setTimeout(() => {
			this.props.onSuccess();
      this.setState({ isLoading: false });
      this.buttonAnimated.setValue(0);
			this.growAnimated.setValue(0);
		}, 300);
	}

	_onGrow = () => {
		Animated.timing(
			this.growAnimated,
			{
				toValue: 1,
				duration: 200,
				easing: Easing.linear
			}
		).start();
	}

	render() {
		const changeWidth = this.buttonAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [DEVICE_WIDTH - MARGIN, MARGIN]
	  });
	  const changeScale = this.growAnimated.interpolate({
	    inputRange: [0, 1],
	    outputRange: [1, MARGIN]
	  });

		return (
			<View style={styles.container}>
				<Animated.View style={{width: changeWidth}}>
					<TouchableOpacity style={styles.button}
						onPress={this._onPress}
						activeOpacity={1} >
							{ this.state.isLoading ?
								<Image source={spinner} style={styles.image} />
								:
								<Text style={styles.text}>LOGIN</Text>
							}
					</TouchableOpacity>
					<Animated.View style={[ styles.circle, {transform: [{scale: changeScale}]} ]} />
				</Animated.View>
			</View>
		);
	}
}

AnimatedButton.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#27D4B2',
		height: MARGIN,
		borderRadius: 20,
		zIndex: 100,
	},
	circle: {
		height: MARGIN,
		width: MARGIN,
		marginTop: -MARGIN,
		borderWidth: 1,
		borderColor: '#27D4B2',
		borderRadius: 100,
		alignSelf: 'center',
		zIndex: 99,
		backgroundColor: '#27D4B2',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
	},
});

export default AnimatedButton;

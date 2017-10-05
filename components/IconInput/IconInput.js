import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import Dimensions from 'Dimensions';


class IconInput extends Component {
	state = {
		text: '',
		cursorPosition: 0
	}

	render() {
		return (
			<View style={styles.inputWrapper}>

				<Image
					source={this.props.source}
					style={styles.inlineImg}
				/>

				<TextInput
					style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					ref={this.props.setRef}
					onChangeText={this.props.onChangeText}
					placeholderTextColor='white'
					underlineColorAndroid='transparent'
				/>

			{this.props.addon ? this.props.addon : null}
			</View>
		);
	}
}

IconInput.propTypes = {
	source: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
	addon: PropTypes.element
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		width: DEVICE_WIDTH - 40,
		height: 40,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#ffffff',
	},
	inputWrapper: {
		flex: 1,
	},
	inlineImg: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},
});

export default IconInput;

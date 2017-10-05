import React, { Component, PropTypes } from 'react';
import {
	StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image
} from 'react-native';

import IconInput from '../IconInput';
// import ButtonSubmit from './ButtonSubmit';
// import SignupSection from './SignupSection';

import usernameImg from './images/username.png';
import passwordImg from './images/password.png';
import eyeImg  from './images/eye_black.png';


class LoginForm extends Component {
	state = {
		showPass: false
	}

	constructor(props) {
    super(props);
	}

	togglePass = () => {
		this.setState({showPass: !this.state.showPass});

		let password = this.passwordInput;
		password.blur();
  }

	render() {
		let revealPasswordControl = (
			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.btnEye}
				onPress={this.togglePass}
			>
				<Image source={eyeImg} style={styles.iconEye} />
			</TouchableOpacity>
		);

		return (
			<KeyboardAvoidingView
				behavior='padding'
				style={styles.container}
			>
				<IconInput
					source={usernameImg}
					placeholder='Username'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false}
					onChangeText={this.props.onUsernameChange}
				/>

				<IconInput
					source={passwordImg}
					secureTextEntry={!this.state.showPass}
					placeholder='Password'
					returnKeyType={'done'}
					autoCapitalize={'none'}
					autoCorrect={false}
					addon={revealPasswordControl}
					setRef={(input) => { this.passwordInput = input; }}
					onChangeText={this.props.onPasswordChange}
				/>

			</KeyboardAvoidingView>
		);
	}
}

LoginForm.propTypes = {
	onUsernameChange: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	btnEye: {
    position: 'absolute',
    top: 8,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});

export default LoginForm;

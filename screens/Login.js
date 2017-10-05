import React from 'react';
import { StyleSheet, View } from 'react-native';

import Wallpaper from '../components/Wallpaper';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import AnimatedButton from '../components/AnimatedButton';
import User from '../models/User';


class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null  // hide the header
  };

  state = {
    username: '',
    password: ''
  };

  _onUsernameChange = (text) => {
    this.setState({username: text});
  }

  _onPasswordChange = (text) => {
    this.setState({password: text});
  }

  onSubmit = async () => {
    // AJAX Request to login user
    let user = await User.login({
      username: this.state.username,
      password: this.state.password
    });

    return user;
  }

  onSuccess = () => {
    this.props.navigation.navigate('BookList');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Wallpaper>
				<Logo />
				<LoginForm
          onUsernameChange={this._onUsernameChange}
          onPasswordChange={this._onPasswordChange}
        />
				{/*<SignupSection/>*/}
				<AnimatedButton onSubmit={this.onSubmit} onSuccess={this.onSuccess}/>
			</Wallpaper>
    );
  }
}

export default LoginScreen;

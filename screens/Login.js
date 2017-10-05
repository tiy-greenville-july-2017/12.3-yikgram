import React from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '../components/Button';
import Wallpaper from '../components/Wallpaper';
import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';
import AnimatedButton from '../components/AnimatedButton';


function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null  // hide the header
  };

  _onSubmit = async () => {
    // AJAX Request to login user
    await timeout(2000);
    this.props.navigation.navigate('BookList');
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Wallpaper>
				<Logo />
				<LoginForm />
				{/*<SignupSection/>*/}
				<AnimatedButton onSubmit={this._onSubmit}/>
			</Wallpaper>
    );
  }
}

export default LoginScreen;

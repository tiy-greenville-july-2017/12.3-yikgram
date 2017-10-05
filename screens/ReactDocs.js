import React, { Component } from 'react';
import { WebView } from 'react-native';

class ReactDocsScreen extends Component {
  static navigationOptions = {
    title: 'React Native Documentation',
  };

  render() {
    return (
      <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 10}}
      />
    );
  }
}

export default ReactDocsScreen;

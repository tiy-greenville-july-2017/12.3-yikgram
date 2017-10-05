import React from 'react';
import { StackNavigator, AsyncStorage } from 'react-navigation';
// import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './screens/Login';
import BookListScreen from './screens/BookList';
import BookDetailScreen from './screens/BookDetail';
import ReactDocsScreen from './screens/ReactDocs';


const App = StackNavigator({
  Login: { screen: LoginScreen },
  BookList: { screen: BookListScreen },
  BookDetail: { screen: BookDetailScreen },
  ReactDocs: {screen: ReactDocsScreen}
});


export default App;

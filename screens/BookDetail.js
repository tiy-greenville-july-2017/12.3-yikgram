import React from 'react';
import { View, Text } from 'react-native';


class BookDetailScreen extends React.Component{
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.book.title
  });

  render(){
    let navProps = this.props.navigation.state.params;
    return (
      <View>
        <Text>{navProps.book.title}</Text>
      </View>
    )
  }
}


export default BookDetailScreen;

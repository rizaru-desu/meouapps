import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Text> panel </Text>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  /* Setting the background color of the screen to white. */
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Panel;

import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

/* This is importing the FontAwesome icon library. */
import McI from 'react-native-vector-icons/MaterialCommunityIcons';

/* Importing the heightPercentageToDP function from the react-native-responsive-screen library. */
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/* Importing the FastImage component from the react-native-fast-image library. */
import FastImage from 'react-native-fast-image';

/* Importing the LOGOS constant from the images.js file. */
import {LOGOS} from '../images';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <McI
          name="arrow-left-circle"
          size={hp('6%')}
          color="#F0134D"
          style={{margin: 10}}
        />

        <ScrollView></ScrollView>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Profile: {},
});

export default Profile;

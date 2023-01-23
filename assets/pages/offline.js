import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, BackHandler} from 'react-native';

/* This is a library that helps you to make your app responsive. */
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

/* Importing the FastImage component from the react-native-fast-image library. */
import FastImage from 'react-native-fast-image';

/* Importing the LOGOS constant from the images.js file. */
import {OFFLINE_CHAR} from '../images';

class Offline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
  }

  handleBack = () => {
    BackHandler.exitApp();
    return true;
  };

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <FastImage
          style={Styles.imageLogos}
          source={OFFLINE_CHAR}
          resizeMode={FastImage.resizeMode.contain}
        />

        <Text style={Styles.labelError}>
          Your Network connection is not avaiable...
        </Text>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  /* Setting the background color of the screen to white. */
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Setting the height and width of the image to 40% of the screen height and width. */
  imageLogos: {height: hp('40%'), width: hp('40%'), alignSelf: 'center'},

  labelError: {
    fontFamily: 'UB',
    fontSize: hp('2.5%'),
    marginVertical: 10,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#000',
  },
});

export default Offline;

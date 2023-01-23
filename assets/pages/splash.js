import React, {Component} from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';

/* This is a library that helps you to make your app responsive. */
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

/* Importing the FastImage component from the react-native-fast-image library. */
import FastImage from 'react-native-fast-image';

/* Importing the LOGOS constant from the images.js file. */
import {LOGOS} from '../images';

/* Importing the AlertDownloader, AlertModal, and AlertUpdatesModal components from the components
folder. */
import {AlertDownloader, AlertModal, AlertUpdatesModal} from '../components';

/* Importing the connect function from the react-redux library. */
import {connect} from 'react-redux';
import {getDownlod, getUpdates} from '../redux/splashSlices';

/* Importing the Animatable component from the react-native-animatable library. */
import * as Animatable from 'react-native-animatable';

/* This is a library that helps you to check and request for permissions. */
import {
  checkMultiple,
  PERMISSIONS,
  requestMultiple,
} from 'react-native-permissions';

/* This is a library that helps you to check the internet connection of the device. */
import NetInfo from '@react-native-community/netinfo';

/* Importing the replace function from the refNavigation.js file. */
import {replace} from '../configs/refNavigation';
import {isDissmissAlert} from '../redux/splashSlices';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      NetInfo.fetch().then(state => {
        if (!state.isConnected && !state.isInternetReachable) {
          replace('Offline');
        } else {
          checkMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.REQUEST_INSTALL_PACKAGES,
          ]).then(statuses => {
            if (
              statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
              statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] ===
                'granted' &&
              statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] ===
                'granted' &&
              statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] ===
                'granted' &&
              statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] ===
                'granted' &&
              statuses[PERMISSIONS.ANDROID.REQUEST_INSTALL_PACKAGES] ===
                'granted'
            ) {
              this.props.dispatch(getUpdates());
            } else {
              requestMultiple([
                PERMISSIONS.ANDROID.CAMERA,
                PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                PERMISSIONS.ANDROID.REQUEST_INSTALL_PACKAGES,
              ]).then(() => {
                this.props.dispatch(getUpdates());
              });
            }
          });
        }
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <Animatable.View
          animation={'fadeInDown'}
          duration={3000}
          style={Styles.containerImageLogos}>
          <FastImage
            style={Styles.imageLogos}
            source={LOGOS}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animatable.View>
        <View style={Styles.containerFooter}>
          <Text style={Styles.labelTitleApps}>Official Mobile Apps</Text>
          <Text style={Styles.labelCopyright}>© Meou, 2022</Text>
        </View>
        <AlertModal
          visible={this.props.initSplash.setAlert}
          error={this.props.initSplash.setMessage}
          dismiss={() => this.props.dispatch(isDissmissAlert())}
        />
        <AlertUpdatesModal
          visible={this.props.initSplash.setUpdate}
          updates={() => {
            this.props.dispatch(getDownlod());
          }}
        />
        <AlertDownloader
          visible={this.props.initSplash.setDownload}
          current={this.props.initSplash.setCurrentSize}
          total={this.props.initSplash.setTotalSize}
        />
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

  /* Centering the image vertically. */
  containerImageLogos: {flex: 1, justifyContent: 'center'},

  /* Setting the height and width of the image to 40% of the screen height and width. */
  imageLogos: {height: hp('40%'), width: hp('40%'), alignSelf: 'center'},

  /* Aligning the footer to the center of the screen and giving it a margin of 10. */
  containerFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  /* Setting the color of the text to black and the font size to 2.6% of the screen height. */
  labelTitleApps: {
    color: '#000',
    fontSize: hp('2.6%'),
    fontFamily: 'UR',
  },

  /* Setting the color of the text to black and the font size to 2% of the screen height. */
  labelCopyright: {color: '#000', fontSize: hp('2.5%'), fontFamily: 'UR'},
});

const mapStateToProps = state => {
  const {initSplash} = state;
  return {initSplash};
};

export default connect(mapStateToProps)(Splash);

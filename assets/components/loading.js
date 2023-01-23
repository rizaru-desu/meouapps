/* eslint-disable react-native/no-inline-styles */
/* Importing the entire React library. */
import * as React from 'react';

/* Importing the Text component from the react-native library. */
import {Text, View} from 'react-native';

/* Importing the Modal component from the react-native-modal library. */
import Modal from 'react-native-modal';

/* Importing the heightPercentageToDP function from the react-native-responsive-screen library. */
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Lottie from 'lottie-react-native';
import {LOADING} from '../images';

const Loading = props => {
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={props.visible}
      backdropColor="#fff"
      backdropOpacity={0.7}>
      <Lottie
        source={LOADING}
        autoPlay
        loop
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
        }}
      />
    </Modal>
  );
};

export default Loading;

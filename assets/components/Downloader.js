/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

/* Importing the Text component from the react-native library. */
import {Text, View} from 'react-native';

/* Importing the Modal component from the react-native-modal library. */
import Modal from 'react-native-modal';

/* Importing the heightPercentageToDP function from the react-native-responsive-screen library. */
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Downloader = props => {
  return (
    <Modal isVisible={props.visible} backdropColor="#fff" backdropOpacity={0.7}>
      <View
        style={{
          padding: 20,
          marginHorizontal: 20,
          backgroundColor: '#F5F0E3',
          borderRadius: 10,
          alignItems: 'center',
          borderColor: '#F0134D',
          borderWidth: 3,
        }}>
        <Text
          style={{
            fontSize: hp('2.5%'),
            textTransform: 'uppercase',
            fontFamily: 'UB',
            color: '#000',
          }}>
          Notification
        </Text>

        <Text
          style={{
            fontSize: hp('2%'),
            textTransform: 'capitalize',
            fontFamily: 'UR',
            color: '#000',
            marginVertical: 20,
          }}>
          Downloading File … {props.current} / {props.total}
        </Text>
      </View>
    </Modal>
  );
};

export default Downloader;

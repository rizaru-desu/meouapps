/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

/* Importing the Text component from the react-native library. */
import {Text, Pressable, View} from 'react-native';

/* Importing the Modal component from the react-native-modal library. */
import Modal from 'react-native-modal';

/* Importing the heightPercentageToDP function from the react-native-responsive-screen library. */
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Updates = props => {
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
          numberOfLines={5}
          style={{
            fontSize: hp('2%'),
            textTransform: 'capitalize',
            fontFamily: 'UR',
            color: '#000',
            marginVertical: 20,
          }}>
          Update is Avaiable …
        </Text>

        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: '#F0134D',
          }}
          onPress={props.updates}>
          <Text
            style={{
              fontSize: hp('2%'),
              textTransform: 'uppercase',
              fontFamily: 'UB',
              color: '#fff',
            }}>
            Update
          </Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default Updates;

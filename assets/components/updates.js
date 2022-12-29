/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

/* Importing the Modal, Text, and Button components from the react-native-paper library. */
import {Modal, Text, Button} from 'react-native-paper';

/* Importing the heightPercentageToDP function from the react-native-responsive-screen library. */
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Updates = props => {
  return (
    <Modal
      visible={props.visible}
      dismissable={false}
      contentContainerStyle={{
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
          fontSize: hp('2%'),
          textTransform: 'uppercase',
          fontFamily: 'KufamBold',
        }}>
        Notification
      </Text>

      <Text
        numberOfLines={5}
        style={{
          fontSize: hp('1.5%'),
          textTransform: 'capitalize',
        }}>
        Update is Avaiable …
      </Text>
      <Button
        buttonColor="#F0134D"
        uppercase
        mode="contained"
        labelStyle={{fontFamily: 'KufamBold'}}
        onPress={props.updates}>
        Update
      </Button>
    </Modal>
  );
};

export default Updates;

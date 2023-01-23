/* eslint-disable react-native/no-inline-styles */
/* Importing the entire React library. */
import * as React from 'react';

/* Importing the Text component from the react-native library. */
import {Text, View, ScrollView, Pressable, StyleSheet} from 'react-native';

/* Importing the Modal component from the react-native-modal library. */
import Modal from 'react-native-modal';

/* Importing the heightPercentageToDP function from the react-native-responsive-screen library. */
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/* Importing the useSelector hook from the react-redux library. */
import {useDispatch, useSelector} from 'react-redux';

/* Importing the isDetailGempa function from the dashboardSlices.js file. */
import {isDetailGempa} from '../redux/dashboardSlices';

/* Importing the FastImage component from the react-native-fast-image library. */
import FastImage from 'react-native-fast-image';

/* Importing the parse function from the qs library. */
import {parse} from 'qs';

/* This is importing the FontAwesome icon library. */
import McI from 'react-native-vector-icons/MaterialCommunityIcons';

const ModalGempa = props => {
  const {setDetailGempa, setGempa} = useSelector(state => state.initDashboard);
  const dispatch = useDispatch();
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={setDetailGempa}
      backdropColor="#fff"
      backdropOpacity={0.7}>
      <View style={Styles.containerGempa}>
        <Text
          style={{
            fontFamily: 'UB',
            fontSize: hp('3%'),
            color: 'black',
            textAlign: 'center',
          }}>
          {parse(setGempa).Tanggal}
          {'\n'}
          {parse(setGempa).Jam}
        </Text>

        <ScrollView style={{margin: 5}} showsVerticalScrollIndicator={false}>
          <FastImage
            style={Styles.imgGempa}
            source={{
              uri:
                'https://data.bmkg.go.id/DataMKG/TEWS/' +
                parse(setGempa).Shakemap,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <McI name="waveform" size={hp('4%')} color="#F0134D" />
              <Text style={Styles.labelGempa}>
                Magnitude {parse(setGempa).Magnitude}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <McI name="access-point" size={hp('4%')} color="#F0134D" />
              <Text style={Styles.labelGempa}>
                Kedalaman {parse(setGempa).Kedalaman}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <McI name="map-marker-alert" size={hp('4%')} color="#F0134D" />
              <Text style={Styles.labelGempa}>
                {parse(setGempa).Lintang}
                {'\n'}
                {parse(setGempa).Bujur}
              </Text>
            </View>
          </View>

          <Text style={Styles.labelGempaDesc}>
            Kedalaman {parse(setGempa).Wilayah}
          </Text>
          <Text
            style={{
              marginHorizontal: 5,
              marginVertical: 10,
              textAlign: 'center',
              fontFamily: 'UR',
              fontSize: hp('2.5%'),
              color: 'black',
            }}>
            Kedalaman {parse(setGempa).Potensi}
          </Text>

          <Text style={Styles.labelGempaDesc}>
            Kedalaman {parse(setGempa).Dirasakan}
          </Text>
        </ScrollView>
        <Pressable
          onPress={() => dispatch(isDetailGempa({setDetailGempa: false}))}
          style={Styles.buttonClose}>
          <Text style={Styles.labelButton}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  labelGempaDesc: {
    marginHorizontal: 5,
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'UR',
    fontSize: hp('2.5%'),
    color: 'black',
  },

  labelGempa: {
    marginHorizontal: 5,
    fontFamily: 'UR',
    fontSize: hp('2.5%'),
    color: 'black',
  },
  buttonClose: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  labelButton: {
    fontFamily: 'UB',
    fontSize: hp('2.5%'),
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#F0134D',
  },
  containerGempa: {
    backgroundColor: '#ff8caa',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F0134D',
    borderStyle: 'dashed',
    height: hp('70%'),
  },
  imgGempa: {
    height: hp('40%'),
    width: hp('40%'),
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default ModalGempa;

/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
} from 'react-native';

/* This is a library that helps you to make your app responsive. */
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/* Importing the FastImage component from the react-native-fast-image library. */
import FastImage from 'react-native-fast-image';

/* This is importing the FontAwesome icon library. */
import McI from 'react-native-vector-icons/MaterialCommunityIcons';

import {BannerAd, TestIds} from 'react-native-google-mobile-ads';

/* Importing the connect function from the react-redux library. */
import {connect} from 'react-redux';
import {
  getData,
  isDetailGempa,
  isDissmissAlert,
  setLogout,
} from '../redux/dashboardSlices';

import {AlertDetailGempa, AlertLoading, AlertModal} from '../components';
import {LOGOS} from '../images';
import {navigate} from '../configs/refNavigation';

import {parse} from 'qs';

import _ from 'lodash';

class Dashbaoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.props.dispatch(getData());
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <View style={Styles.headerUser}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FastImage
              style={Styles.Profile}
              source={
                this.props.initDashboard.setUser.Photos === 'null'
                  ? LOGOS
                  : {uri: this.props.initDashboard.setUser.Photos}
              }
              resizeMode={FastImage.resizeMode.contain}
            />

            <View style={{flex: 1, margin: 10}}>
              <Text style={Styles.labelUser}>Developer</Text>
              <Text style={Styles.labelUser}>SMK 10</Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                  onPress={() => {
                    navigate('profile');
                  }}
                  style={Styles.buttonHeader}>
                  <Text style={Styles.buttonLabelHeader}>Setting</Text>
                </Pressable>

                <Pressable
                  onPress={() => this.props.dispatch(setLogout())}
                  style={Styles.buttonHeader}>
                  <Text style={Styles.buttonLabelHeader}>logout</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <ScrollView nestedScrollEnabled>
          <Text
            style={{
              fontSize: hp('2.5%'),
              fontFamily: 'UB',
              textTransform: 'capitalize',
              color: 'black',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            Weather
          </Text>

          {this.props.initDashboard.setCuaca === undefined ? (
            <Text style={Styles.labelErrorLoad}>
              Something wrong!, refresh weather
            </Text>
          ) : (
            <>
              <View style={Styles.containerGempaCuaca}>
                <Text style={Styles.labelHeaderWeather}>
                  {parse(this.props.initDashboard.setCuaca).name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <ScrollView
                    nestedScrollEnabled
                    pagingEnabled
                    showsVerticalScrollIndicator={false}>
                    {_.map(
                      parse(this.props.initDashboard.setCuaca).weather,
                      item => {
                        let icon =
                          item.icon === '01d'
                            ? require('../images/weather/01d.png')
                            : item.icon === '01n'
                            ? require('../images/weather/01n.png')
                            : item.icon === '02d'
                            ? require('../images/weather/02d.png')
                            : item.icon === '02n'
                            ? require('../images/weather/02n.png')
                            : item.icon === '03d'
                            ? require('../images/weather/03d.png')
                            : item.icon === '03n'
                            ? require('../images/weather/03n.png')
                            : item.icon === '04d'
                            ? require('../images/weather/04d.png')
                            : item.icon === '04n'
                            ? require('../images/weather/04n.png')
                            : item.icon === '09d'
                            ? require('../images/weather/09d.png')
                            : item.icon === '09n'
                            ? require('../images/weather/09n.png')
                            : item.icon === '10d'
                            ? require('../images/weather/10d.png')
                            : item.icon === '10n'
                            ? require('../images/weather/10n.png')
                            : item.icon === '11d'
                            ? require('../images/weather/11d.png')
                            : item.icon === '11n'
                            ? require('../images/weather/11n.png')
                            : item.icon === '13d'
                            ? require('../images/weather/13d.png')
                            : item.icon === '13n'
                            ? require('../images/weather/13n.png')
                            : item.icon === '50d'
                            ? require('../images/weather/50d.png')
                            : item.icon === '50n'
                            ? require('../images/weather/50n.png')
                            : null;
                        return (
                          <View
                            key={item.id}
                            style={{
                              alignItems: 'center',
                              flex: 1,
                              justifyContent: 'space-around',
                            }}>
                            <FastImage
                              style={{
                                width: hp('10%'),
                                height: hp('10%'),
                              }}
                              source={icon}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                            <Text
                              style={{
                                marginHorizontal: 5,
                                fontFamily: 'UB',
                                fontSize: hp('2.5%'),
                                color: 'black',
                                textTransform: 'capitalize',
                              }}>
                              {item.main}
                            </Text>
                            <Text
                              style={{
                                marginHorizontal: 5,
                                fontFamily: 'UR',
                                fontSize: hp('2.5%'),
                                color: 'black',
                                textTransform: 'capitalize',
                              }}>
                              {item.description}
                            </Text>
                          </View>
                        );
                      },
                    )}
                  </ScrollView>

                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Text style={Styles.labelTempWeather}>
                        {(
                          parse(this.props.initDashboard.setCuaca).main.temp -
                          273.15
                        ).toFixed(1)}
                        °C
                      </Text>

                      <FastImage
                        style={{
                          width: hp('5%'),
                          height: hp('5%'),
                        }}
                        source={
                          (
                            parse(this.props.initDashboard.setCuaca).main.temp -
                            273.15
                          ).toFixed(1) < 10
                            ? require('../images/weather/cold.png')
                            : (
                                parse(this.props.initDashboard.setCuaca).main
                                  .temp - 273.15
                              ).toFixed(1) > 30
                            ? require('../images/weather/hot.png')
                            : require('../images/weather/temperature.png')
                        }
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <View>
                      <Text style={Styles.labelTitleDescWeather}>
                        feels like
                      </Text>
                      <Text style={Styles.labelDescWeather}>
                        {(
                          parse(this.props.initDashboard.setCuaca).main
                            .feels_like - 273.15
                        ).toFixed(1)}
                        °C
                      </Text>
                    </View>

                    <View>
                      <Text style={Styles.labelTitleDescWeather}>pressure</Text>
                      <Text style={Styles.labelDescWeather}>
                        {parse(this.props.initDashboard.setCuaca).main.pressure}
                      </Text>
                    </View>

                    <View>
                      <Text style={Styles.labelTitleDescWeather}>humidity</Text>
                      <Text style={Styles.labelDescWeather}>
                        {parse(this.props.initDashboard.setCuaca).main.humidity}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}

          <Text
            style={{
              fontSize: hp('2.5%'),
              fontFamily: 'UB',
              textTransform: 'capitalize',
              color: 'black',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            BMKG (Current Earthquake)
          </Text>

          <View style={Styles.containerGempaCuaca}>
            <Text style={Styles.labelDateGempa}>
              {parse(this.props.initDashboard.setGempa).Tanggal}
              {'\n'}
              {parse(this.props.initDashboard.setGempa).Jam}
            </Text>

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
                  Magnitude {parse(this.props.initDashboard.setGempa).Magnitude}
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <McI name="access-point" size={hp('4%')} color="#F0134D" />
                <Text style={Styles.labelGempa}>
                  Kedalaman {parse(this.props.initDashboard.setGempa).Kedalaman}
                </Text>
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <McI name="map-marker-alert" size={hp('4%')} color="#F0134D" />
                <Text style={Styles.labelGempa}>
                  {parse(this.props.initDashboard.setGempa).Lintang}
                  {'\n'}
                  {parse(this.props.initDashboard.setGempa).Bujur}
                </Text>
              </View>
            </View>

            <Pressable
              style={{
                backgroundColor: '#F0134D',
                paddingHorizontal: 10,
                paddingVertical: 5,
                margin: 5,
                borderRadius: 10,
              }}
              onPress={() => {
                this.props.dispatch(isDetailGempa({setDetailGempa: true}));
              }}>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  fontFamily: 'UB',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                  color: 'white',
                }}>
                More Detail
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              flexWrap: 'wrap',
              marginVertical: 5,
              marginHorizontal: 10,
            }}>
            <Pressable>
              <Text>Journal</Text>
            </Pressable>
          </View>
        </ScrollView>

        <View style={Styles.containerFooter}>
          <Text style={Styles.labelCopyright}>© Meou, 2022</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <BannerAd size="468x50" unitId={TestIds.BANNER} />
        </View>

        <AlertLoading visible={this.props.initDashboard.setLoading} />

        <AlertDetailGempa visible={true} />

        <AlertModal
          visible={this.props.initDashboard.setAlert}
          error={this.props.initDashboard.setMessage}
          dismiss={() => this.props.dispatch(isDissmissAlert())}
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

  headerUser: {
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: '#F34875',
    backgroundColor: '#F34875',
    margin: 10,
  },

  containerGempaCuaca: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#F0134D',
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 10,
  },

  buttonHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 10,
  },

  buttonLabelHeader: {
    fontFamily: 'UB',
    fontSize: hp('2%'),
    textTransform: 'uppercase',
    color: 'black',
  },

  labelUser: {
    fontFamily: 'UR',
    fontSize: hp('2.5%'),
    color: 'white',
    borderBottomWidth: 2,
    borderStyle: 'dashed',
    borderBottomColor: 'white',
    paddingVertical: 5,
    marginVertical: 5,
  },

  Profile: {
    height: hp('12%'),
    width: hp('12%'),
    borderRadius: 1000,
    borderWidth: 2,
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'white',
  },

  labelGempa: {
    marginHorizontal: 5,
    fontFamily: 'UR',
    fontSize: hp('2%'),
    color: 'black',
  },

  labelDateGempa: {
    fontFamily: 'UB',
    fontSize: hp('2%'),
    color: 'black',
    textAlign: 'center',
  },

  labelHeaderWeather: {
    fontFamily: 'UB',
    fontSize: hp('2.5%'),
    color: '#F0134D',
    textAlign: 'center',
    marginVertical: 5,
  },

  labelErrorLoad: {
    fontSize: hp('2.5%'),
    fontFamily: 'UB',
    textTransform: 'capitalize',
    textAlign: 'center',
    color: 'red',
  },

  labelTempWeather: {
    marginHorizontal: 5,
    fontFamily: 'UR',
    fontSize: hp('5%'),
    color: 'black',
  },

  labelTitleDescWeather: {
    marginHorizontal: 5,
    fontFamily: 'UB',
    fontSize: hp('2.2%'),
    color: 'black',
    textTransform: 'capitalize',
  },

  labelDescWeather: {
    marginHorizontal: 5,
    fontFamily: 'UR',
    fontSize: hp('1.8%'),
    color: 'black',
  },

  /* Aligning the footer to the center of the screen and giving it a margin of 10. */
  containerFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  /* Setting the color of the text to black and the font size to 2% of the screen height. */
  labelCopyright: {color: '#000', fontSize: hp('2.5%'), fontFamily: 'UR'},
});

const mapStateToProps = state => {
  const {initDashboard} = state;
  return {initDashboard};
};

export default connect(mapStateToProps)(Dashbaoard);

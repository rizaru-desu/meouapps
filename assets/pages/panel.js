/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
} from 'react-native';

/* This is a library that helps you to make your app responsive. */
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/* This is importing the FontAwesome icon library. */
import Icon from 'react-native-vector-icons/FontAwesome';

/* Importing the FastImage component from the react-native-fast-image library. */
import FastImage from 'react-native-fast-image';

/* A library that helps you to make your app responsive. */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

/* Importing the Formik component from the formik library. */
import {Formik} from 'formik';

/* Importing the LOGOS constant from the images.js file. */
import {PANEL_CATS} from '../images';

/* Importing the connect function from the react-redux library. */
import {connect} from 'react-redux';

import * as yup from 'yup';

import {navigate} from '../configs/refNavigation';
import {AlertLoading, AlertModal} from '../components';
import {getLogin, isDissmissAlert} from '../redux/panelLoginSlices';

class Panel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    /* This is a validation schema that is used to validate the email and password inputs. */
    const loginValidationSchema = yup.object().shape({
      email: yup
        .string()
        .email('Please enter valid email')
        .required('Email Address is Required'),
      password: yup
        .string()
        .min(6, ({min}) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    });

    return (
      <SafeAreaView style={Styles.container}>
        <View
          style={{
            marginVertical: 10,
          }}>
          <FastImage
            style={{
              height: null,
              width: wp('60%'),
              aspectRatio: 1,
              alignSelf: 'center',
            }}
            source={PANEL_CATS}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{fontFamily: 'UB', fontSize: hp('4%'), color: '#000'}}>
            Hello Again!
          </Text>
          <Text style={{fontFamily: 'UR', fontSize: hp('2.5%'), color: '#000'}}>
            Log in to your existant account of MEOU
          </Text>
        </View>

        <KeyboardAwareScrollView>
          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 20,
            }}>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginValidationSchema}
              onSubmit={values =>
                this.props.dispatch(getLogin(values.email, values.password))
              }>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                isValid,
                values,
              }) => (
                <>
                  <View style={Styles.containerTextInput}>
                    <Icon name="envelope" size={30} color="#F0134D" />
                    <TextInput
                      style={Styles.labelTextInput}
                      keyboardType="email-address"
                      placeholder="Please inputs Email..."
                      placeholderTextColor="#000"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>

                  {errors.email && (
                    <Text
                      style={{
                        fontSize: hp('1.5%'),
                        color: '#F0134D',
                        fontFamily: 'UB',
                      }}>
                      {errors.email}
                    </Text>
                  )}

                  <View style={Styles.containerTextInput}>
                    <Icon name="key" size={30} color="#F0134D" />
                    <TextInput
                      style={Styles.labelTextInput}
                      placeholder="Please inputs Password..."
                      secureTextEntry
                      placeholderTextColor="#000"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                  </View>

                  {errors.password && (
                    <Text
                      style={{
                        fontSize: hp('1.5%'),
                        color: '#F0134D',
                        fontFamily: 'UB',
                      }}>
                      {errors.password}
                    </Text>
                  )}

                  <Text
                    onPress={() => {
                      console.log('Forgot');
                    }}
                    style={Styles.labelRecovery}>
                    Recovery Password
                  </Text>

                  <Pressable
                    disabled={!isValid}
                    style={Styles.containerButton}
                    onPress={handleSubmit}>
                    <Text style={Styles.labelButton}>Login</Text>
                  </Pressable>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>

        <View style={Styles.containerNotAMember}>
          <Text
            onPress={() => {
              navigate('panelSignup');
            }}
            style={Styles.labelNotAmember}>
            Not a member? Register now
          </Text>
        </View>

        <View style={Styles.containerFooter}>
          <Text style={Styles.labelCopyright}>© Meou, 2022</Text>
        </View>

        <AlertLoading visible={this.props.initPanelLogin.setLoading} />

        <AlertModal
          visible={this.props.initPanelLogin.setAlert}
          error={this.props.initPanelLogin.setMessage}
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

  /* Aligning the footer to the center of the screen and giving it a margin of 10. */
  containerFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },

  /* A style object that is used to style the text input label. */
  containerTextInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#a6a6a61A',
  },

  /* This is a style object that is used to style the button. */
  containerButton: {
    backgroundColor: '#F0134D',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  /* A style object that is used to style the button. */
  labelButton: {
    fontFamily: 'UB',
    fontSize: hp('2.5%'),
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#fff',
  },

  /* A style object that is used to style the text input label. */
  labelTextInput: {
    fontFamily: 'UR',
    color: '#000',
    fontSize: hp('2.5%'),
    padding: 0,
    flex: 1,
    marginVertical: 5,
    borderBottomColor: '#F0134D',
    borderBottomWidth: 3,
    marginHorizontal: 10,
  },

  /* A style object that is used to style the text input label. */
  labelRecovery: {
    fontSize: hp('2.5%'),
    fontFamily: 'UR',
    textAlign: 'right',
    color: '#000',
    marginVertical: 10,
  },

  /* A style object that is used to style the text input label. */
  containerNotAMember: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* A style object that is used to style the text input label. */
  labelNotAmember: {
    fontSize: hp('2.5%'),
    fontFamily: 'UR',
    color: '#000',
    marginVertical: 10,
  },

  /* Setting the color of the text to black and the font size to 2% of the screen height. */
  labelCopyright: {color: '#000', fontSize: hp('2%'), fontFamily: 'UR'},
});

const mapStateToProps = state => {
  const {initPanelLogin} = state;
  return {initPanelLogin};
};

export default connect(mapStateToProps)(Panel);

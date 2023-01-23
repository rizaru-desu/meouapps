/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Text,
} from 'react-native';

/* This is a library that helps you to make your app responsive. */
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/* Importing the FastImage component from the react-native-fast-image library. */
import FastImage from 'react-native-fast-image';

/* This is importing the FontAwesome icon library. */
import Icon from 'react-native-vector-icons/FontAwesome';

/* Importing the LOGOS constant from the images.js file. */
import {CATS_SIGNUP} from '../images';

/* Importing the connect function from the react-redux library. */
import {connect} from 'react-redux';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

/* A library that helps you to make your app responsive. */
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Formik} from 'formik';

import {goBack, navigate} from '../configs/refNavigation';

import {getRegister, isDissmissAlert} from '../redux/panelSignUpSlices';

import * as yup from 'yup';

import {AlertLoading, AlertModal} from '../components';

class PanelSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    /* This is a validation schema that is used to validate the email and password inputs. */
    const ValidationSchema = yup.object().shape({
      fullname: yup
        .string()
        .matches(/(\w.+\s).+/, 'Enter at least 2 names')
        .required('Full name is required'),
      academy: yup.string().required('Universitas/School is required'),
      phone: yup
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone number is required'),
      email: yup
        .string()
        .email('Please enter valid email')
        .required('Email is required'),
      password: yup
        .string()
        .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
        .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
        .matches(/\d/, 'Password must have a number')
        .matches(
          /[!@#$%^&*()\-_"=+{}; :,<.>]/,
          'Password must have a special character',
        )
        .min(8, ({min}) => `Password must be at least ${min} characters`)
        .required('Password is required'),
      agree: yup.bool().isTrue('Please Agreement & Privacy Policy'),
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
              width: wp('80%'),
              aspectRatio: 2,
              alignSelf: 'center',
            }}
            source={CATS_SIGNUP}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{fontFamily: 'UB', fontSize: hp('4%'), color: '#000'}}>
            Let's Get Started!
          </Text>
          <Text
            style={{
              fontFamily: 'UR',
              fontSize: hp('2.5%'),
              color: '#000',
              textAlign: 'center',
            }}>
            Create an account to MEOU for get all features
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
                fullname: '',
                phone: '',
                academy: '',
                email: '',
                password: '',
                agree: false,
              }}
              validationSchema={ValidationSchema}
              onSubmit={values => {
                this.props.dispatch(
                  getRegister(
                    values.email,
                    values.password,
                    values.fullname,
                    values.phone,
                    values.academy,
                  ),
                );
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                errors,
                isValid,
                values,
              }) => (
                <>
                  <View style={Styles.containerTextInput}>
                    <Icon name="id-card" size={30} color="#F0134D" />
                    <TextInput
                      style={Styles.labelTextInput}
                      keyboardType="visible-password"
                      placeholder="Please inputs Fullname..."
                      placeholderTextColor="#000"
                      onChangeText={handleChange('fullname')}
                      onBlur={handleBlur('fullname')}
                      value={values.fullname}
                    />
                  </View>

                  {errors.fullname && (
                    <Text
                      style={{
                        fontSize: hp('1.5%'),
                        color: '#F0134D',
                        fontFamily: 'UB',
                      }}>
                      {errors.fullname}
                    </Text>
                  )}

                  <View style={Styles.containerTextInput}>
                    <Icon name="phone" size={30} color="#F0134D" />
                    <TextInput
                      style={Styles.labelTextInput}
                      keyboardType="phone-pad"
                      placeholder="Please inputs Phone 08xxx..."
                      placeholderTextColor="#000"
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                  </View>

                  {errors.phone && (
                    <Text
                      style={{
                        fontSize: hp('1.5%'),
                        color: '#F0134D',
                        fontFamily: 'UB',
                      }}>
                      {errors.phone}
                    </Text>
                  )}

                  <View style={Styles.containerTextInput}>
                    <Icon name="tags" size={30} color="#F0134D" />
                    <TextInput
                      style={Styles.labelTextInput}
                      keyboardType="visible-password"
                      placeholder="Please inputs Universitas/School..."
                      placeholderTextColor="#000"
                      onChangeText={handleChange('academy')}
                      onBlur={handleBlur('academy')}
                      value={values.academy}
                    />
                  </View>

                  {errors.academy && (
                    <Text
                      style={{
                        fontSize: hp('1.5%'),
                        color: '#F0134D',
                        fontFamily: 'UB',
                      }}>
                      {errors.academy}
                    </Text>
                  )}

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

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <BouncyCheckbox
                      size={hp('2.5%')}
                      fillColor="red"
                      unfillColor="#FFFFFF"
                      iconStyle={{borderColor: '#F0134D'}}
                      style={{marginHorizontal: 5}}
                      onPress={v => setFieldValue('agree', v)}
                    />

                    <Text
                      style={{
                        fontFamily: 'UR',
                        color: '#000',
                        fontSize: hp('2.5%'),
                      }}>
                      Please Agree To Our Terms Of Use And Privacy Policy
                    </Text>
                  </View>

                  {errors.agree && (
                    <Text
                      style={{
                        fontSize: hp('1.5%'),
                        color: '#F0134D',
                        fontFamily: 'UB',
                      }}>
                      {errors.agree}
                    </Text>
                  )}

                  <Pressable
                    disabled={!isValid}
                    style={Styles.containerButton}
                    onPress={handleSubmit}>
                    <Text style={Styles.labelButton}>Registered</Text>
                  </Pressable>
                </>
              )}
            </Formik>
          </View>
        </KeyboardAwareScrollView>

        <View style={Styles.containerAMember}>
          <Text
            onPress={() => {
              navigate('panel');
            }}
            style={Styles.labelAmember}>
            Already have a account? Login now
          </Text>
        </View>

        <View style={Styles.containerFooter}>
          <Text style={Styles.labelCopyright}>© Meou, 2022</Text>
        </View>

        <AlertLoading visible={this.props.initPanelRegister.setLoading} />

        <AlertModal
          visible={this.props.initPanelRegister.setAlert}
          error={this.props.initPanelRegister.setMessage}
          onDismiss={() => {
            goBack();
          }}
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
    marginVertical: 10,
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
  containerAMember: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* A style object that is used to style the text input label. */
  labelAmember: {
    fontSize: hp('2.5%'),
    fontFamily: 'UR',
    color: '#000',
    marginVertical: 10,
  },

  /* Setting the color of the text to black and the font size to 2% of the screen height. */
  labelCopyright: {color: '#000', fontSize: hp('2.5%'), fontFamily: 'UR'},
});

const mapStateToProps = state => {
  const {initPanelRegister} = state;
  return {initPanelRegister};
};

export default connect(mapStateToProps)(PanelSignup);

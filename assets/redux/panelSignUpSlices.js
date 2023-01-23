/* Importing the `createSlice` function from the `@reduxjs/toolkit` package. */
import {createSlice} from '@reduxjs/toolkit';

/* Importing the firestore module from the firebase. */
import firestore from '@react-native-firebase/firestore';

/* Importing the authentication module from the firebase. */
import auth from '@react-native-firebase/auth';

import publicIP from 'react-native-public-ip';

const initialState = {
  setAlert: false,
  setLoading: false,
  setMessage: '',
};

export const RegisterLoginSlices = createSlice({
  name: 'initPanelRegister',
  initialState,
  reducers: {
    isAlert: (state, action) => {
      state.setAlert = true;
      state.setLoading = false;
      state.setMessage = action.payload.setMessage;
    },

    isLoading: (state, action) => {
      state.setLoading = action.payload.setLoading;
    },

    isDissmissAlert: state => {
      state.setAlert = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {isAlert, isLoading, isDissmissAlert} =
  RegisterLoginSlices.actions;

/**
 * The function is called getLogin and it takes two parameters, email and password. It returns a
 * function that takes dispatch as a parameter. The function then calls the firebase auth() function
 * and passes in the email and password. If the login is successful, it does nothing. If the login is
 * unsuccessful, it calls the isAlert function and passes in an object with a setMessage property
 * @param email - The email address of the user.
 * @param password - The user's password.
 */
export const getRegister =
  (email, password, fullname, phone, academy) => async dispatch => {
    try {
      dispatch(isLoading({setLoading: true}));

      publicIP()
        .then(async ip => {
          await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
              firestore()
                .collection('users')
                .doc(res.user.uid)
                .set({
                  Fullname: fullname,
                  Academy: academy,
                  Phone: phone.replace(/^0/, '+62'),
                  Email: email,
                  Password: password,
                  Geolocation: new firestore.GeoPoint(0, 0),
                  IpAddress: ip,
                  CreateAt: new firestore.Timestamp.fromDate(new Date()),
                  UpdateAt: new firestore.Timestamp(0, 0),
                  Photos: null,
                })
                .then(() => {
                  dispatch(isLoading({setLoading: false}));
                  auth().signOut();
                  dispatch(
                    isAlert({
                      setMessage: 'Register account is succesfully!',
                    }),
                  );
                });
            })
            .catch(error => {
              dispatch(isAlert({setMessage: error.message}));
            });
        })
        .catch(error => {
          dispatch(isAlert({setMessage: error.message}));
        });
    } catch (error) {
      dispatch(isAlert({setMessage: error.message}));
    }
  };

export default RegisterLoginSlices.reducer;

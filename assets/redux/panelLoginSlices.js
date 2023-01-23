/* Importing the `createSlice` function from the `@reduxjs/toolkit` package. */
import {createSlice} from '@reduxjs/toolkit';

/* Importing the database from the firebase. */
import database from '@react-native-firebase/database';

/* Importing the authentication module from the firebase. */
import auth from '@react-native-firebase/auth';

/* Importing the `replace` function from the `refNavigation` file. */
import {replace} from '../configs/refNavigation';

const initialState = {
  setAlert: false,
  setLoading: false,
  setMessage: '',
};

export const PanelLoginSlices = createSlice({
  name: 'initPanelLogin',
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
export const {isAlert, isLoading, isDissmissAlert} = PanelLoginSlices.actions;

/**
 * The function is called getLogin and it takes two parameters, email and password. It returns a
 * function that takes dispatch as a parameter. The function then calls the firebase auth() function
 * and passes in the email and password. If the login is successful, it does nothing. If the login is
 * unsuccessful, it calls the isAlert function and passes in an object with a setMessage property
 * @param email - The email address of the user.
 * @param password - The user's password.
 */
export const getLogin = (email, password) => async dispatch => {
  try {
    dispatch(isLoading({setLoading: true}));
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(isLoading({setLoading: false}));
        replace('dashboard');
      })
      .catch(error => {
        dispatch(isAlert({setMessage: error.message}));
      });
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
};

export const recoveryPassword = () => async dispatch => {};

export default PanelLoginSlices.reducer;

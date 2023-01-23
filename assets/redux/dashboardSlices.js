/* Importing the `createSlice` function from the `@reduxjs/toolkit` package. */
import {createSlice} from '@reduxjs/toolkit';

/* Importing the firestore module from the firebase. */
import firestore from '@react-native-firebase/firestore';

/* Importing the authentication module from the firebase. */
import auth from '@react-native-firebase/auth';

/* Importing the `replace` function from the `refNavigation` file. */
import {replace} from '../configs/refNavigation';

/* This is a package that allows us to store data locally. */
import AsyncStorage from '@react-native-async-storage/async-storage';

/* This is a package that allows us to make HTTP requests. */
import axios from 'axios';

/* This is a package that allows us to get the user's location. */
import Geolocation from '@react-native-community/geolocation';

/* This is a package that allows us to parse the query string. */
import {parse} from 'qs';

const initialState = {
  setAlert: false,
  setLoading: false,
  setMessage: '',

  setDetailGempa: false,

  setGempa: undefined,
  setCuaca: undefined,
  setUser: {},
};

export const DashboardSlices = createSlice({
  name: 'initDashboard',
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

    isGempa: (state, action) => {
      state.setGempa = action.payload.setGempa;
    },

    isCuaca: (state, action) => {
      state.setCuaca = action.payload.setCuaca;
    },

    isUser: (state, action) => {
      state.setUser = action.payload.setUser;
    },

    isDetailGempa: (state, action) => {
      state.setDetailGempa = action.payload.setDetailGempa;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  isAlert,
  isLoading,
  isDissmissAlert,
  isGempa,
  isCuaca,
  isUser,
  isDetailGempa,
} = DashboardSlices.actions;

export const getData = () => async dispatch => {
  try {
    await dispatch(isLoading({setLoading: true}));
    await HelperGetUser(dispatch);
    await HelperWeather(dispatch);
    await HelperGetBMKG(dispatch);

    await dispatch(isLoading({setLoading: false}));
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
};

export const setLogout = () => async dispatch => {
  try {
    await dispatch(isLoading({setLoading: true}));
    auth()
      .signOut()
      .then(async () => {
        await dispatch(isLoading({setLoading: false}));
        await AsyncStorage.removeItem('@USER');
        await replace('splash');
      });
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
};

async function HelperGetUser(dispatch) {
  try {
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(async querySnapshot => {
          let USER = {
            UserId: user.uid,
            Fullname: querySnapshot.get('Fullname'),
            Academy: querySnapshot.get('Academy'),
            Phone: querySnapshot.get('Phone'),
            Email: querySnapshot.get('Email'),
            Photos: querySnapshot.get('Photos'),
          };
          await AsyncStorage.setItem('@USER', JSON.stringify(USER));

          await dispatch(isUser({setUser: USER}));
        });
    } else {
      replace('splash');
    }
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
}

async function HelperGetBMKG(dispatch) {
  try {
    await axios
      .get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')
      .then(res => {
        dispatch(isGempa({setGempa: res.data.Infogempa.gempa}));
      });
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
}

async function HelperWeather(dispatch) {
  try {
    Geolocation.getCurrentPosition(
      async pos => {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude.toFixed(
              2,
            )}&lon=${pos.coords.longitude.toFixed(
              2,
            )}&appid=5e045cfcc9ae452092198658f6a9e98d`,
          )
          .then(async res => {
            const user = await AsyncStorage.getItem('@USER');
            firestore()
              .collection('users')
              .doc(parse(user).UserId)
              .update({
                Geolocation: new firestore.GeoPoint(
                  pos.coords.latitude,
                  pos.coords.longitude,
                ),
              });
            dispatch(isCuaca({setCuaca: res.data}));
          });
      },
      error => dispatch(isAlert({setMessage: error.message})),
      {enableHighAccuracy: true, timeout: 60000},
    );
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
}

export default DashboardSlices.reducer;

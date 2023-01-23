/* Importing the `createSlice` function from the `@reduxjs/toolkit` package. */
import {createSlice} from '@reduxjs/toolkit';

/* Importing the firestore module from the firebase. */
import firestore from '@react-native-firebase/firestore';

/* Importing the authentication module from the firebase. */
import auth from '@react-native-firebase/auth';

/* Importing the versionCode and version from the package.json file. */
import {versionCode, version} from '../../package.json';

/* Used to access the file system. */
import RNFS from 'react-native-fs';

/* Used to open the downloaded file. */
import FileViewer from 'react-native-file-viewer';

/* Importing the `replace` function from the `refNavigation` file. */
import {replace} from '../configs/refNavigation';

const initialState = {
  setAlert: false,
  setLoading: false,
  setMessage: '',
  setUpdate: false,
  setDownload: false,

  setTotalSize: 0,
  setCurrentSize: 0,
};

export const SplashSlices = createSlice({
  name: 'initSplash',
  initialState,
  reducers: {
    isAlert: (state, action) => {
      state.setAlert = true;
      state.setLoading = false;
      state.setMessage = action.payload.setMessage;
    },
    isUpdate: (state, action) => {
      state.setUpdate = true;
    },

    isDownload: (state, action) => {
      state.setUpdate = false;
      state.setDownload = action.payload.setDownload;
    },

    isTotalSize: (state, action) => {
      state.setTotalSize = action.payload.setTotalSize;
    },

    isCurrentSize: (state, action) => {
      state.setCurrentSize = action.payload.setCurrentSize;
    },

    isDissmissAlert: state => {
      state.setAlert = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  isAlert,
  isUpdate,
  isDownload,
  isTotalSize,
  isCurrentSize,
  isDissmissAlert,
} = SplashSlices.actions;

export const getUpdates = () => async dispatch => {
  try {
    firestore()
      .collection('config')
      .doc('VneqyZytPyeySZsohS6l')
      .get()
      .then(querySnapshot => {
        if (versionCode !== querySnapshot.get('VersionCode')) {
          dispatch(isUpdate());
        } else {
          setTimeout(() => {
            const user = auth().currentUser;
            if (user) {
              replace('dashboard');
            } else {
              replace('panel');
            }
          }, 5000);
        }
      })
      .catch(error => {
        dispatch(isAlert({setMessage: error.message}));
      });
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
};

export const getDownlod = () => async dispatch => {
  try {
    firestore()
      .collection('config')
      .doc('VneqyZytPyeySZsohS6l')
      .get()
      .then(querySnapshot => {
        const localDirectory = `${RNFS.DocumentDirectoryPath}`;

        RNFS.exists(localDirectory + '/' + `${version}.apk`).then(fileExist => {
          if (!fileExist) {
            dispatch(isDownload({setDownload: true}));

            const downloadFile = {
              fromUrl: querySnapshot.get('Path'),
              toFile: localDirectory + '/' + `${version}.apk`,
              begin: async res => {
                dispatch(
                  isTotalSize({
                    setTotalSize: await detectSize(res.contentLength),
                  }),
                );
              },
              progress: async res => {
                dispatch(
                  isCurrentSize({
                    setCurrentSize: await detectSize(res.bytesWritten),
                  }),
                );
              },
            };

            RNFS.downloadFile(downloadFile)
              .promise.then(() => {
                dispatch(isDownload({setDownload: false}));
                FileViewer.open(localDirectory + '/' + `${version}.apk`).catch(
                  error => {
                    dispatch(isAlert({setMessage: error.message}));
                  },
                );
              })
              .catch(error => {
                dispatch(isAlert({setMessage: error.message}));
              });
          } else {
            FileViewer.open(localDirectory + '/' + `${version}.apk`).catch(
              error => {
                dispatch(isAlert({setMessage: error.message}));
              },
            );
          }
        });
      });
  } catch (error) {
    dispatch(isAlert({setMessage: error.message}));
  }
};

/**
 * It takes a number of bytes and returns a string with the number of bytes, kilobytes, megabytes, or
 * gigabytes, depending on the size
 * @param bytes - The number of bytes to convert to a human-readable format.
 * @returns the size of the file in bytes, KB, MB, or GB.
 */
async function detectSize(bytes) {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + ' MB';
  } else {
    return (bytes / 1073741824).toFixed(2) + ' GB';
  }
}

export default SplashSlices.reducer;

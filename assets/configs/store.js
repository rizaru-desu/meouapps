import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {SplashSlices} from '../redux';
import reactotronConfig from './configTotron';

export const store = configureStore({
  reducer: {initSplash: SplashSlices},
  middleware: [thunk],
  enhancers: [reactotronConfig.createEnhancer()],
});

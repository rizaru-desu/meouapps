import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import {
  DashboardSlices,
  LoginSlices,
  RegisterSlices,
  SplashSlices,
} from '../redux';

import reactotronConfig from './configTotron';

export const store = configureStore({
  reducer: {
    initSplash: SplashSlices,
    initPanelLogin: LoginSlices,
    initPanelRegister: RegisterSlices,
    initDashboard: DashboardSlices,
  },
  middleware: [thunk],
  enhancers: [reactotronConfig.createEnhancer()],
});

/* Importing the React library and the Component class from the react library. */
import React, {Component} from 'react';
/* Provider is a component that allows you to pass the store to all the components in the application. */
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

/* Importing the store from the store.js file. */
import {store} from './assets/configs/store';

/* Importing the routes.js file. */
import Routes from './assets/configs/routes';

/* Importing the refNavigation.js file. */
import {RefNavigation} from './assets/configs/refNavigation';

import {MobileAds} from 'react-native-google-mobile-ads';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    MobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.tron.log(adapterStatuses);
      });

    if (__DEV__) {
      import('./assets/configs/configTotron').then(() =>
        console.tron.log('Reactotron Configured'),
      );
    }
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={RefNavigation}>
          <Routes />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

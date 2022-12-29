/* Importing the React library and the Component class from the react library. */
import React, {Component} from 'react';
/* Provider is a component that allows you to pass the store to all the components in the application. */
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import {
  configureFonts,
  MD3LightTheme,
  Portal,
  Provider as PaperProvider,
} from 'react-native-paper';

import {store} from './assets/configs/store';
import Routes from './assets/configs/routes';
import {RefNavigation} from './assets/configs/refNavigation';
import {fontConfig} from './assets/configs/configFonts';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (__DEV__) {
      import('./assets/configs/configTotron').then(() =>
        console.tron.log('Reactotron Configured'),
      );
    }
  }

  render() {
    const theme = {
      ...MD3LightTheme,
      fonts: configureFonts({config: fontConfig}),
    };
    return (
      <PaperProvider theme={theme}>
        <Portal>
          <Provider store={store}>
            <NavigationContainer ref={RefNavigation}>
              <Routes />
            </NavigationContainer>
          </Provider>
        </Portal>
      </PaperProvider>
    );
  }
}

export default App;

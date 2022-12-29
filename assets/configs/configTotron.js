import {NativeModules} from 'react-native';
import Reactotron, {
  asyncStorage,
  trackGlobalErrors,
} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {scriptURL} = NativeModules.SourceCode;
const hostName = scriptURL.split('://')[1].split(':')[0];

export default Reactotron.configure({
  name: 'MEOU App',
  host: hostName,
  port: 9090,
})
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .use(reactotronRedux())
  .use(trackGlobalErrors())
  .use(asyncStorage())
  .connect();

console.tron = Reactotron;

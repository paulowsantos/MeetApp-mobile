import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './src/config/ReactotronConfig';
import { store, persistor } from './src/store';
import App2 from './src/App2';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#22202c" />
        <App2 />
      </PersistGate>
    </Provider>
  );
}

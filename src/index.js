import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { storeConfig } from './redux/store';
import App from './App';

const { store, persistor } = storeConfig();

ReactDOM.render(
     <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
               <App />
          </PersistGate>
     </Provider>,
     document.getElementById('root')
);

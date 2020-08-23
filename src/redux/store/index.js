import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';

const persistConfig = {
     key: 'root',
     storage,
     blacklist: ['companiesReducer', 'banksReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeConfig = () => {
     let store = createStore(persistedReducer, applyMiddleware(thunk, logger));
     let persistor = persistStore(store);
     return { store, persistor };
};

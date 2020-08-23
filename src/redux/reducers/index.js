import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { companiesReducer } from './companiesReducer';
import { banksReducer } from './banksReducer';

export default combineReducers({ authReducer, companiesReducer, banksReducer });

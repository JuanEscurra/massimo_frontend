import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from 'modules/auth/reducers/authReducer';
import { uiReducer } from 'shared/reducers/uiReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer
});


export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>

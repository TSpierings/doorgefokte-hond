import { combineReducers } from 'redux';

export const rootReducer = combineReducers({ /* Add Some reducers right here */});

export type RootState = ReturnType<typeof rootReducer>;

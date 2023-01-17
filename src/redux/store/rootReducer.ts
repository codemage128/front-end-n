import { combineReducers } from '@reduxjs/toolkit';
import { reducer as user } from '../slices/user';
const rootReducer = combineReducers({
    user,
});

export default rootReducer;

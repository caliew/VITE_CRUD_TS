import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import authReducer from './features/authSlice';
import workersReducer from './features/workersSlice';
import restaurantsReducer from './features/restaurantsSlice';
import iotPortalReducer from './features/iotPortalSlice';



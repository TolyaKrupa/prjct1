import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { movieReducer } from "./slices/movieSlice";

const rootReducer = combineReducers({
    movieReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
});

export {setupStore}
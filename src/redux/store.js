import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import rootReducer from "./combineReducer"; // Assuming you have multiple reducers combined

// Create store with thunk middleware and Redux DevTools extension
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // Enable Redux DevTools and apply middleware
);

export default store;

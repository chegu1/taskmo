import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { jobListReducer, jobCreateReducer } from './reducers/jobReducers';
import { userLoginReducer } from './reducers/authReducers';

const reducers = combineReducers({
    jobList: jobListReducer,
    jobCreate: jobCreateReducer,
    userLogin: userLoginReducer
})

const middleware = [thunk];
const store = createStore(reducers,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;
import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';

import headerReducer from '../Reducers/HeaderReducer';
import specsReducer from '../Reducers/SpecialtiesReducer';
import profileReducer from '../Reducers/ProfileReducer';

let reducers = combineReducers({
    header: headerReducer,
    specs: specsReducer,
    profile: profileReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
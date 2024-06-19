import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';

import headerReducer from '../Reducers/HeaderReducer';
import specsReducer from '../Reducers/SpecialtiesReducer';
import profileReducer from '../Reducers/ProfileReducer';
import patientsListReducer from '../Reducers/PatientsListReducer';
import mkbReducer from '../Reducers/MkbReducer';
import patientReducer from '../Reducers/PatientReducer';
import inspectionsListReducer from '../Reducers/InspectionListReducer';

let reducers = combineReducers({
    header: headerReducer,
    specs: specsReducer,
    profile: profileReducer,
    patients: patientsListReducer,
    patient: patientReducer,
    mkb : mkbReducer,
    inspectionsList : inspectionsListReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
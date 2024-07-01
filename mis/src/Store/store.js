import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import { thunk } from 'redux-thunk';

import headerReducer from '../Reducers/HeaderReducer';
import specsReducer from '../Reducers/SpecialtiesReducer';
import profileReducer from '../Reducers/ProfileReducer';
import patientsListReducer from '../Reducers/PatientsListReducer';
import mkbReducer from '../Reducers/MkbReducer';
import patientReducer from '../Reducers/PatientReducer';
import inspectionsListReducer from '../Reducers/InspectionListReducer';
import createInspectionReducer from '../Reducers/CreateInspectionReducer';
import inspectionDetailsReducer from '../Reducers/InspectionDetailsReducer';
import consultationsListReducer from '../Reducers/ConsultationReducer';
import reportReducer from '../Reducers/ReportReducer';

let reducers = combineReducers({
    header: headerReducer,
    specs: specsReducer,
    profile: profileReducer,
    patients: patientsListReducer,
    patient: patientReducer,
    mkb : mkbReducer,
    inspectionsList : inspectionsListReducer,
    createInspection : createInspectionReducer,
    inspectionDetails : inspectionDetailsReducer,
    consultationsList : consultationsListReducer,
    report : reportReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
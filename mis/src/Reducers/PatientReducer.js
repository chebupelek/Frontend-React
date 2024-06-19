import { patientsApi } from "../Api/patientsApi";

const SET_PATIENT = "SET_PATIENT";

let initialPatientState = {
    patient: {
        name: "",
        birthday: Date(),
        gender: "",
        id: "",
        createTime: Date()
    }
}

const patientReducer = (state = initialPatientState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_PATIENT:
            newState.patient = action.patient;
            return newState;
        default:
            return newState;
    }
}

export function setPatientActionCreator(data){
    return {type: SET_PATIENT, patient: data}
}

export function getPatientThunkCreator(id) {
    return (dispatch) => {
        return patientsApi.getPatient(id)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(setPatientActionCreator(data));
        })
    }
}

export default patientReducer;
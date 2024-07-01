import { patientsApi } from "../Api/patientsApi";

const SET_PATIENTS = "SET_PATIENTS";

let initialPatientsListState = {
    patients: [
      {
        id: "",
        createTime: Date(),
        name: "",
        birthday: Date(),
        gender: ""
      }
    ],
    pagination: {
      size: 0,
      count: 0,
      current: 0
    }
  }

const patientsListReducer = (state = initialPatientsListState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_PATIENTS:
            newState.patients = action.patients;
            newState.pagination = action.pagination;
            return newState;
        default:
            return newState;
    }
}

export function getPatientsListActionCreator(data){
    return {type: SET_PATIENTS, patients: data.patients, pagination: data.pagination}
}

export function getPatientsListThunkCreator(queryParams, navigate) {
    return (dispatch) => {
        return patientsApi.getPatients(queryParams, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getPatientsListActionCreator(data));
        })
    }
}

export function setNewPacientThunkCreator(data, navigate){
    return (dispatch) => {
        return patientsApi.setPacient(data, navigate)
            .then(data => {
                return data;
        })
    }
}

export default patientsListReducer;
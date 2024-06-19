import { mkbApi } from "../Api/mkbApi";

const SET_DIAGNOSIS = "SET_DIAGNOSIS";
const SET_ROOTS = "SET_ROOTS";

let initialMkbState = {
    diagnosis: [
        {
            id: "",
            createTime: Date(),
            code: "",
            name: ""
        }
    ],
    roots: [
        {
            id: "",
            createTime: Date(),
            code: "",
            name: ""
        }
    ]
}

const mkbReducer = (state = initialMkbState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_DIAGNOSIS:
            newState.diagnosis = action.diagnosis;
            return newState;
        case SET_ROOTS:
            newState.roots = action.roots;
            return newState;
        default:
            return newState;
    }
}

export function setDiagnosisActionCreator(data){
    return {type: SET_DIAGNOSIS, diagnosis: data}
}

export function setRootsActionCreator(data){
    return {type: SET_ROOTS, roots: data}
}

export function getDiagnosisThunkCreator(name) {
    return (dispatch) => {
        return mkbApi.diagnosis(name)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(setDiagnosisActionCreator(data));
        })
    }
}

export function getRootsThunkCreator() {
    return (dispatch) => {
        return mkbApi.roots()
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(setRootsActionCreator(data));
        })
    }
}

export default mkbReducer;
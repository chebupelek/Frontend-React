import { inspectionsApi } from "../Api/inspectionApi";

const SET_INSPECTIONS = "SET_INSPECTIONS";

let initialInspectionsListState = {
    inspections: [
    {
        id: "",
        createTime: Date(),
        previousId: "",
        date: Date(),
        conclusion: "",
        doctorId: "",
        doctor: "",
        patientId: "",
        patient: "",
        diagnosis: {
            id: "",
            createTime: Date(),
            code: "",
            name: "",
            description: "",
            type: ""
        },
        hasChain: Boolean(),
        hasNested: Boolean()
        }
    ],
    pagination: {
        size: 0,
        count: 0,
        current: 0
    }
}

const inspectionsListReducer = (state = initialInspectionsListState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_INSPECTIONS:
            newState.inspections = action.inspections;
            newState.pagination = action.pagination;
            return newState;
        default:
            return newState;
    }
}

export function getPatientsListActionCreator(data){
    return {type: SET_INSPECTIONS, inspections: data.inspections, pagination: data.pagination}
}

export function getInspectionsListThunkCreator(queryParams, navigate) {
    return (dispatch) => {
        return inspectionsApi.getInspectionsList(queryParams, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getPatientsListActionCreator(data));
        })
    }
}

export function getInspectionsChildsThunkCreator(id, navigate) {
    return (dispatch) => {
        return inspectionsApi.getInspectionsChilds(id, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return data;
        })
    }
}

export default inspectionsListReducer;
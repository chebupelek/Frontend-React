import { consultationsApi } from "../Api/consultationApi";

const SET_CONSULTATION = "SET_CONSULTATION";

let initialConsultationListState = {
    consultations: [
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

const consultationsListReducer = (state = initialConsultationListState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_CONSULTATION:
            newState.consultations = action.inspections;
            newState.pagination = action.pagination;
            return newState;
        default:
            return newState;
    }
}

export function getConsultationsListActionCreator(data){
    return {type: SET_CONSULTATION, inspections: data.inspections, pagination: data.pagination}
}

export function getConsultationsListThunkCreator(queryParams) {
    return (dispatch) => {
        return consultationsApi.getConsultationsList(queryParams)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getConsultationsListActionCreator(data));
        })
    }
}

export default consultationsListReducer;
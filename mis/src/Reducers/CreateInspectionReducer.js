import { inspectionsApi } from "../Api/inspectionApi";

const SET_INSPECTIONS_LIST = "SET_INSPECTIONS_LIST";
const SET_ISAGAIN = "SET_ISAGAIN";
const SET_PEVIOUS_ISPECTION = "SET_PEVIOUS_ISPECTION";
const SET_NEW_INSPECTION_DATE = "SET_NEW_INSPECTION_DATE";
const SET_NEW_INSPECTION_COMPLAINTS = "SET_NEW_INSPECTION_COMPLAINTS";
const SET_NEW_INSPECTION_ANAMNESIS = "SET_NEW_INSPECTION_ANAMNESIS";
const SET_NEED_CONSULTATION = "SET_NEED_CONSULTATION";
const SET_CONSULTATION = "SET_CONSULTATION";
const SET_DIAGNOSIS = "SET_DIAGNOSIS";
const SET_NEW_INSPECTION_TREATMENT = "SET_NEW_INSPECTION_TREATMENT";

let initialCreateInspectionState = {
    prevInspectionData: {
        isAgain: false,
        previousInspectionId: "",
        previousInspectionDate: Date(),
        previousInspectionCode: "",
        previousInspectionName: "",
        prevInspectionStatus: true
    },
    newInspectionData: {
        inspectionDate: {
            data : Date(),
            status : true
        },
        complaints: {
            data : "",
            status : true
        },
        anamnesis: {
            data : "",
            status : true
        },
        needConsultation: false,
        consultations: [],
        diagnosis: [],
        treatment: {
            data : "",
            status : true
        }
    },
    prevInspectionsList: [
        {
            id: "",
            createTime: Date(),
            date: Date(),
            diagnosis: {
                id: "",
                createTime: Date(),
                code: "",
                name: "",
                description: "",
                type: ""
            }
        }
    ]
}

const createInspectionReducer = (state = initialCreateInspectionState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_PEVIOUS_ISPECTION:
            newState.prevInspectionData.isAgain = true;
            newState.prevInspectionData.previousInspectionId = action.previousInspectionId;
            newState.prevInspectionData.previousInspectionDate = action.previousInspectionDate;
            newState.prevInspectionData.previousInspectionCode = action.previousInspectionCode;
            newState.prevInspectionData.previousInspectionName = action.previousInspectionName;
            newState.prevInspectionData.prevInspectionStatus = true;
        case SET_ISAGAIN:
            newState.prevInspectionData.isAgain = action.isAgain;
            return newState;
        case SET_INSPECTIONS_LIST:
            newState.prevInspectionsList = action.prevInspectionsList;
            return newState;
        case SET_NEW_INSPECTION_DATE:
            newState.newInspectionData.inspectionDate.data = action.data;
            newState.newInspectionData.inspectionDate.status = true;
            return newState;
        case SET_NEW_INSPECTION_COMPLAINTS:
            newState.newInspectionData.complaints.data = action.data;
            newState.newInspectionData.complaints.status = true;
            return newState;
        case SET_NEW_INSPECTION_ANAMNESIS:
            newState.newInspectionData.anamnesis.data = action.data;
            newState.newInspectionData.anamnesis.status = true;
            return newState;
        case SET_NEED_CONSULTATION:
            newState.newInspectionData.needConsultation = action.data;
            return newState;
        case SET_CONSULTATION:
            newState.newInspectionData.consultations.push(action.consultation);
            return newState;
        case SET_DIAGNOSIS:
            newState.newInspectionData.diagnosis.push(action.diagnosis);
            return newState;
        case SET_NEW_INSPECTION_TREATMENT:
            newState.newInspectionData.treatment.data = action.data;
            newState.newInspectionData.treatment.status = true;
            return newState;
        default:
            return newState;
    }
}

export function setIsAgainActionCreator(isAgain){
    return {type: SET_ISAGAIN, isAgain: isAgain}
}

export function setPrevInspectionActionCreator(id, date, code, name){
    return {type: SET_PEVIOUS_ISPECTION, previousInspectionId: id, previousInspectionDate: date, previousInspectionCode: code, previousInspectionName: name}
}

export function setPrevInspectionsListActionCreator(data){
    return {type: SET_INSPECTIONS_LIST, prevInspectionsList: data}
}

export function setNewInspectionDateActionCreator(date){
    return {type: SET_NEW_INSPECTION_DATE, data: date}
}

export function setNewInspectionComplaintsActionCreator(data){
    return {type: SET_NEW_INSPECTION_COMPLAINTS, data: data}
}

export function setNewInspectionAnamnesisActionCreator(data){
    return {type: SET_NEW_INSPECTION_ANAMNESIS, data: data}
}

export function setNeedConsultationActionCreator(data){
    return {type: SET_NEED_CONSULTATION, data: data}
}

export function setConsultationActionCreator(data){
    return {type: SET_CONSULTATION, consultation: data}
}

export function setDiagnosisActionCreator(data){
    return {type: SET_DIAGNOSIS, diagnosis: data}
}

export function setNewInspectionTreatmentActionCreator(data){
    return {type: SET_NEW_INSPECTION_TREATMENT, data: data}
}

export function setPrevInspectionsListThunkCreator(pacientId, request) {
    return (dispatch) => {
        return inspectionsApi.getPrevInspectionsList(pacientId, request)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(setPrevInspectionsListActionCreator(data));
        })
    }
}

export default createInspectionReducer;
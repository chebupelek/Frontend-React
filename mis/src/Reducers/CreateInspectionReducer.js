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
const SET_CONCLUSION = "SET_CONCLUSION";
const SET_NEXT_VISIT_DATE = "SET_NEXT_VISIT_DATE";
const SET_DEATH_DATE = "SET_DEATH_DATE";

let initialCreateInspectionState = {
    prevInspectionData: {
        isAgain: false,
        previousInspectionId: "",
        previousInspectionName: "",
        prevInspectionStatus: true
    },
    newInspectionData: {
        inspectionDate: {
            data : null,
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
        conclusion: "Disease",
        nextVisitDate: null,
        deathDate: null
    },
    prevInspectionsList: [
        {
            id: "",
            createTime: null,
            date: null,
            diagnosis: {
                id: "",
                createTime: null,
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
            newState.prevInspectionData.previousInspectionName = action.previousInspectionName;
            console.log(newState.prevInspectionData.previousInspectionId);
            console.log(newState.prevInspectionData.previousInspectionName);
            newState.prevInspectionData.prevInspectionStatus = true;
            return newState;
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
        case SET_CONCLUSION:
            newState.newInspectionData.conclusion = action.data;
            return newState;
        case SET_NEXT_VISIT_DATE:
            newState.newInspectionData.nextVisitDate = action.nextVisitDate;
            return newState;
        case SET_DEATH_DATE:
            newState.newInspectionData.deathDate = action.deathDate;
            return newState;
        default:
            return newState;
    }
}

export function setIsAgainActionCreator(isAgain){
    return {type: SET_ISAGAIN, isAgain: isAgain}
}

export function setPrevInspectionActionCreator(id, name){
    return {type: SET_PEVIOUS_ISPECTION, previousInspectionId: id, previousInspectionName: name}
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
    return {type: SET_CONSULTATION, data: data}
}

export function setConsultationActionCreator(data){
    return {type: SET_NEED_CONSULTATION, consultation: data}
}

export function setDiagnosisActionCreator(data){
    return {type: SET_DIAGNOSIS, diagnosis: data}
}

export function setConclusionActionCreator(data){
    return {type: SET_CONCLUSION, data: data}
}

export function setNextVisitDateActionCreator(data){
    return {type: SET_NEXT_VISIT_DATE, nextVisitDate: data}
}

export function setDeathDateActionCreator(data){
    return {type: SET_DEATH_DATE, deathDate: data}
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
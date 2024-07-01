import { inspectionsApi } from "../Api/inspectionApi";
import { mkbApi } from "../Api/mkbApi";

const CLEAR_DATA = "CLEAR_DATA";
const SET_INSPECTIONS_LIST = "SET_INSPECTIONS_LIST";
const SET_ISAGAIN = "SET_ISAGAIN";
const SET_PEVIOUS_ISPECTION_NAME = "SET_PEVIOUS_ISPECTION_NAME";
const SET_PEVIOUS_ISPECTION_DATA = "SET_PEVIOUS_ISPECTION_DATA";
const SET_NEW_INSPECTION_DATE = "SET_NEW_INSPECTION_DATE";
const SET_NEW_INSPECTION_COMPLAINTS = "SET_NEW_INSPECTION_COMPLAINTS";
const SET_NEW_INSPECTION_ANAMNESIS = "SET_NEW_INSPECTION_ANAMNESIS";
const SET_NEED_CONSULTATION = "SET_NEED_CONSULTATION";
const SET_CONSULTATION = "SET_CONSULTATION";
const SET_NEW_DIAGNOSIS = "SET_NEW_DIAGNOSIS";
const SET_CONCLUSION = "SET_CONCLUSION";
const SET_NEXT_VISIT_DATE = "SET_NEXT_VISIT_DATE";
const SET_DEATH_DATE = "SET_DEATH_DATE";
const SET_NEW_INSPECTION_RECOMENDATIONS = "SET_NEW_INSPECTION_RECOMENDATIONS";

const DATE_PROBLEM = "DATE_PROBLEM";
const PREVIOUS_INSPECTION_PROBLEM = "PREVIOUS_INSPECTION_PROBLEM";
const COMPLAINTS_PROBLEM = "COMPLAINTS_PROBLEM";
const ANAMNESIS_PROBLEM = "ANAMNESIS_PROBLEM";
const RECOMENDATIONS_PROBLEM = "CRECOMENDATIONS_PROBLEM";
const CONSULTATIONS_PROBLEM = "CONSULTATIONS_PROBLEM";
const DIAGNOSIS_PROBLEM = "DIAGNOSIS_PROBLEM";

let initialCreateInspectionState = {
    prevInspectionData: {
        isAgain: false,
        previousInspectionId: "",
        previousInspectionName: "",
        previousInspectionDate: "",
        previousInspectionDiagnosis: {
            id: "",
            createTime: "",
            code: "",
            name: "",
            description: "",
            type: ""
        },
        prevInspectionStatus: true
    },
    newInspectionData: {
        inspectionDate: {
            data : '',
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
        nextVisitDate: "",
        deathDate: "",
        recomendations: {
            data : "",
            status : true
        }
    },
    prevInspectionsList: []
}

const createInspectionReducer = (state = initialCreateInspectionState, action) => {
    let newState = {...state};
    switch(action.type){
        case CLEAR_DATA:
            newState.prevInspectionData = {
                isAgain: false,
                previousInspectionId: "",
                previousInspectionName: "",
                previousInspectionDiagnosis: {
                    id: "",
                    createTime: "",
                    code: "",
                    name: "",
                    description: "",
                    type: ""
                },
                prevInspectionStatus: true
            };
            newState.newInspectionData = {
                inspectionDate: {
                    data : '',
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
                nextVisitDate: "",
                deathDate: "",
                recomendations: {
                    data : "",
                    status : true
                }
            };
            newState.prevInspectionsList = [];
            return newState;
        case SET_PEVIOUS_ISPECTION_NAME:
            newState.prevInspectionData.isAgain = true;
            newState.prevInspectionData.previousInspectionName = action.previousInspectionName;
            return newState;
        case SET_PEVIOUS_ISPECTION_DATA:
            newState.prevInspectionData.isAgain = true;
            newState.prevInspectionData.previousInspectionId = action.previousInspectionId;
            newState.prevInspectionData.previousInspectionDate = action.previousInspectionDate;
            newState.prevInspectionData.previousInspectionDiagnosis = action.previousInspectionDiagnosis;
            newState.prevInspectionData.prevInspectionStatus = true;
            newState.newInspectionData.diagnosis.push({
                id: action.icdId,
                name: `${action.previousInspectionDiagnosis.code} - ${action.previousInspectionDiagnosis.name}`,
                description: action.previousInspectionDiagnosis.description,
                type: action.previousInspectionDiagnosis.type
            });
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
        case SET_NEW_DIAGNOSIS:
            newState.newInspectionData.diagnosis.push(action.diagnos);
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
        case SET_NEW_INSPECTION_RECOMENDATIONS:
            newState.newInspectionData.recomendations.data = action.data;
            newState.newInspectionData.recomendations.status = true;
            return newState;
        case DATE_PROBLEM:
            newState.newInspectionData.inspectionDate.status = false;
            return newState;
        case PREVIOUS_INSPECTION_PROBLEM:
            newState.prevInspectionData.prevInspectionStatus = false;
            return newState;
        case COMPLAINTS_PROBLEM:
            newState.newInspectionData.complaints.status = false;
            return newState;
        case CONSULTATIONS_PROBLEM:
            newState.newInspectionData.consultations = [];
            return newState;
        case DIAGNOSIS_PROBLEM:
            newState.newInspectionData.diagnosis = [];
            if(newState.prevInspectionData.isAgain){
                newState.newInspectionData.diagnosis.push({
                    id: newState.prevInspectionData.previousInspectionDiagnosis.id,
                    name: `${newState.prevInspectionData.previousInspectionDiagnosis.code} - ${newState.prevInspectionData.previousInspectionDiagnosis.name}`,
                    description: newState.prevInspectionData.previousInspectionDiagnosis.description,
                    type: newState.prevInspectionData.previousInspectionDiagnosis.type
                });
            }
            return newState;
        case ANAMNESIS_PROBLEM:
            newState.newInspectionData.anamnesis.status = false;
            return newState;
        case RECOMENDATIONS_PROBLEM:
            newState.newInspectionData.recomendations.status = false;
            return newState;
        default:
            return newState;
    }
}

export function clearDataActionCreator(){
    return {type: CLEAR_DATA}
}

export function setIsAgainActionCreator(isAgain){
    return {type: SET_ISAGAIN, isAgain: isAgain}
}

export function setPrevInspectionNameActionCreator(name){
    return {type: SET_PEVIOUS_ISPECTION_NAME, previousInspectionName: name}
}

export function setPrevInspectionDataActionCreator(id, diagnosis, date, icd){
    return {type: SET_PEVIOUS_ISPECTION_DATA, previousInspectionId: id, previousInspectionDiagnosis: diagnosis, previousInspectionDate: date, icdId: icd}
}

export function setPrevInspectionFromSelectActionCreator(pacientId, id, label, navigate) {
    return async (dispatch, getState) => {
        const name = label.substring(label.lastIndexOf('-') + 1).trim();
        const list = await dispatch(getPrevInspectionsWithIdThunkCreator(pacientId, name, navigate));
        if (!list) {
            return;
        }
        const foundElement = list.find(element => element.id === id);
        if (!foundElement) {
            return;
        }
        const diagnosis = await mkbApi.diagnosis(foundElement.diagnosis.name);
        if(!diagnosis){
            return;
        }
        dispatch(setPrevInspectionDataActionCreator(id, foundElement.diagnosis, foundElement.date, diagnosis[0].id));
    };
}

export function setPrevInspectionsListActionCreator(data){
    return {type: SET_INSPECTIONS_LIST, prevInspectionsList: data}}

export function setNewInspectionDateActionCreator(date){
    return {type: SET_NEW_INSPECTION_DATE, data: date}}

export function setNewInspectionComplaintsActionCreator(data){
    return {type: SET_NEW_INSPECTION_COMPLAINTS, data: data}}

export function setNewInspectionAnamnesisActionCreator(data){
    return {type: SET_NEW_INSPECTION_ANAMNESIS, data: data}}

export function setNeedConsultationActionCreator(data){
    return {type: SET_NEED_CONSULTATION, data: data}}

export function setConsultationActionCreator(data){
    return {type: SET_CONSULTATION, consultation: data}}

export function setNewDiagnosisActionCreator(data){
    return {type: SET_NEW_DIAGNOSIS, diagnos: data}}

export function setConclusionActionCreator(data){
    return {type: SET_CONCLUSION, data: data}}

export function setNextVisitDateActionCreator(data){
    return {type: SET_NEXT_VISIT_DATE, nextVisitDate: data}}

export function setDeathDateActionCreator(data){
    return {type: SET_DEATH_DATE, deathDate: data}}

export function setNewInspectionRecomendationsActionCreator(data){
    return {type: SET_NEW_INSPECTION_RECOMENDATIONS, data: data}}

export function dataProblemActionCreator(){
    return {type: DATE_PROBLEM}}

export function prevInspectionProblemActionCreator(){
    return {type: PREVIOUS_INSPECTION_PROBLEM}}

export function complaintsProblemActionCreator(){
    return {type: COMPLAINTS_PROBLEM}}

export function consultationsProblemActionCreator(){
    return {type: CONSULTATIONS_PROBLEM}}

export function diagnosisProblemActionCreator(){
    return {type: DIAGNOSIS_PROBLEM}}

export function anamnesisProblemActionCreator(){
    return {type: ANAMNESIS_PROBLEM}}

export function recomendationsProblemActionCreator(){
    return {type: RECOMENDATIONS_PROBLEM}}

export function setPrevInspectionsListThunkCreator(pacientId, request, navigate) {
    return (dispatch) => {
        return inspectionsApi.getPrevInspectionsList(pacientId, request, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(setPrevInspectionsListActionCreator(data));
        })
    }
}

export function getPrevInspectionsWithIdThunkCreator(pacientId, request, navigate) {
    return (dispatch) => {
        return inspectionsApi.getPrevInspectionsList(pacientId, request, navigate)
            .then(data => {
                if (!data) {
                    return null;
                }
                return data;
        })
    }
}

export function createInspectionActionCreator(patientId, navigate)
{
    return (dispatch, getState) => {
        const state = getState();
        const createInspectionState = state.createInspection;
        console.log(createInspectionState);

        let check = true;
        let fails = "";

        const inspectionDate = new Date(createInspectionState.newInspectionData.inspectionDate.data);
        const currentDate = new Date();

        if (!inspectionDate || isNaN(inspectionDate.getTime())) {
            check = false;
            fails += "Не установлена дата. ";
            dispatch(dataProblemActionCreator());
        }

        if (inspectionDate > currentDate) {
            check = false;
            fails += "Осмотр не может быть в будущем. ";
        }

        if(createInspectionState.prevInspectionData.isAgain === true){
            if(createInspectionState.prevInspectionData.previousInspectionId === ""){
                check = false;
                fails += "Не установлен осмотр. ";
                dispatch(prevInspectionProblemActionCreator());
            }else{
                const previousInspectionDate = new Date(createInspectionState.prevInspectionData.previousInspectionDate);
                if (createInspectionState.prevInspectionData.isAgain && inspectionDate < previousInspectionDate) {
                    check = false;
                    fails += "Дата нынешнего осмотра раньше даты прошлого осмотра. ";
                    dispatch(dataProblemActionCreator());
                }
            }
        }

        const complaintsData = createInspectionState.newInspectionData.complaints.data;
        if (!complaintsData || complaintsData.length < 1 || complaintsData.length > 5000) {
            check = false;
            dispatch(complaintsProblemActionCreator());
        }

        const anamnesisData = createInspectionState.newInspectionData.anamnesis.data;
        if (!anamnesisData || anamnesisData.length < 1 || anamnesisData.length > 5000) {
            check = false;
            dispatch(anamnesisProblemActionCreator());
        }

        if(createInspectionState.newInspectionData.consultations.length > 0) {
            const specialtyIds = new Set();
            createInspectionState.newInspectionData.consultations.forEach(consultation => {
                if(consultation.comment.length > 1000){
                    check = false;
                    fails += "Комментарий превосходит длинну. ";
                    dispatch(consultationsProblemActionCreator());
                }

                if(specialtyIds.has(consultation.specialtyId)) {
                    check = false;
                    fails += "specialtyId не уникален. ";
                    dispatch(consultationsProblemActionCreator());
                } else {
                    specialtyIds.add(consultation.specialtyId);
                }
            });
        }

        if(createInspectionState.newInspectionData.diagnosis.length > 0) {
            const mainDiagnosisCount = createInspectionState.newInspectionData.diagnosis.filter(diagnosis => diagnosis.type === "Main").length;
            if(mainDiagnosisCount < 1){
                check = false;
                fails += "Нет диагнозов основного типа. ";
                dispatch(diagnosisProblemActionCreator());
            }else{
                if(mainDiagnosisCount > 1){
                    check = false;
                    fails += "Может быть только 1 диагноз основного типа. ";
                    dispatch(diagnosisProblemActionCreator());
                }
            }
        } else {
            check = false;
            fails += "Нужно установить диагнозы. ";
        }

        const recomendationsData = createInspectionState.newInspectionData.recomendations.data;
        if (!recomendationsData || recomendationsData.length < 1 || recomendationsData.length > 5000) {
            check = false;
            dispatch(recomendationsProblemActionCreator());
        }

        if (createInspectionState.newInspectionData.conclusion === "Disease"){
            const nextVisitDate = new Date(createInspectionState.newInspectionData.nextVisitDate);
            if (!nextVisitDate || isNaN(nextVisitDate.getTime())) {
                fails += "Необходимо ввести дату следующего осмотра. ";
                check = false;
            }else{
                if(nextVisitDate <= inspectionDate){
                    fails += "Следующий визит должен быть в будущем. ";
                    check = false;
                }
            }
        }

        if (createInspectionState.newInspectionData.conclusion === "Death"){
            const deathDate = new Date(createInspectionState.newInspectionData.deathDate);
            if (!deathDate || isNaN(deathDate.getTime())) {
                fails += "Необходимо ввести дату смерти. ";
                check = false;
            }else{
                if(deathDate >= inspectionDate){
                    fails += "Как пациент мог умереть позже осмотра? ";
                    check = false;
                }
            }
        }

        if (check === false) {
            console.log(fails);
            alert(fails);
        } else {
            const data = {
                date: inspectionDate.toISOString(),
                anamnesis: createInspectionState.newInspectionData.anamnesis.data,
                complaints: createInspectionState.newInspectionData.complaints.data,
                treatment: createInspectionState.newInspectionData.recomendations.data,
                conclusion: createInspectionState.newInspectionData.conclusion,
                diagnoses: createInspectionState.newInspectionData.diagnosis.map(diagnosis => ({
                    icdDiagnosisId: diagnosis.id,
                    description: diagnosis.description,
                    type: diagnosis.type
                }))
            };
            switch (createInspectionState.newInspectionData.conclusion){
                case "Disease":
                    data.nextVisitDate = new Date(createInspectionState.newInspectionData.nextVisitDate).toISOString();
                    break;
                case "Death":
                    data.deathDate = new Date(createInspectionState.newInspectionData.deathDate).toISOString();
                    break;
            }
            if(createInspectionState.prevInspectionData.isAgain){
                data.previousInspectionId = createInspectionState.prevInspectionData.previousInspectionId;
            }
            if(createInspectionState.newInspectionData.consultations.length > 0){
                data.consultations = createInspectionState.newInspectionData.consultations.map(consultation => ({
                    specialityId: consultation.specialtyId,
                    comment: {
                        content: consultation.comment
                    }
                }));
            }

            return inspectionsApi.createInspection(patientId, data)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    navigate(`/patient/${patientId}`);
                } else {
                    throw new Error(response);
                }
            })
            .catch(error => {
                if (error.response) {
                    switch (error.response.status) {
                        case 400:
                            alert("Ошибка запроса: проверьте введенные данные");
                            break;
                        case 401:
                            localStorage.clear();
                            navigate("/login");
                            break;
                        case 404:
                            alert(`Внутренняя ошибка: ${error.response.data.message}`);
                            break;
                        case 500:
                            alert(`Внутренняя ошибка сервера: ${error.response.data.message}`);
                            break;
                        default:
                            alert(`Произошла ошибка: ${error.response.data.message}`);
                            break;
                    }
                } else {
                    alert(`Произошла ошибка: ${error.message}`);
                }
            });
        }
    };
}

export default createInspectionReducer;
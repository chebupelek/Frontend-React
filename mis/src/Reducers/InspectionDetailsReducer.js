import { inspectionsApi } from "../Api/inspectionApi";
import { mkbApi } from "../Api/mkbApi";

const SET_INSPECTION_DETAILS = "SET_INSPECTION_DETAILS";
const SET_INSPECTION_COMMENTS = "SET_INSPECTION_COMMENTS";
const SET_ICD = "SET_ICD";

let initialInspectionDetailsState = {
    inspectionData: {
        id: "",
        createTime: "",
        date: "",
        anamnesis: "",
        complaints: "",
        treatment: "",
        conclusion: "",
        nextVisitDate: "",
        deathDate: "",
        baseInspectionId: "",
        previousInspectionId: "",
        patient: {
            id: "",
            createTime: "",
            name: "",
            birthday: "",
            gender: ""
        },
        doctor: {
            id: "",
            createTime: "",
            name: "",
            birthday: "",
            gender: "",
            email: "",
            phone: ""
        },
        diagnoses: [
            {
                id: "",
                createTime: "",
                code: "",
                name: "",
                description: "",
                type: ""
            }
        ],
        consultations: [
            {
                id: "",
                createTime: "",
                inspectionId: "",
                speciality: {
                    id: "",
                    createTime: "",
                    name: ""
                },
                rootComment: {
                    id: "",
                    createTime: "",
                    parentId: "",
                    content: "",
                    author: {
                        id: "",
                        createTime: "",
                        name: "",
                        birthday: "",
                        gender: "",
                        email: "",
                        phone: ""
                    },
                    modifyTime: ""
                },
                commentsNumber: 0
            }
        ] 
    },
    consultationsDopData: [],
    diagnoses: []
}

const inspectionDetailsReducer = (state = initialInspectionDetailsState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_INSPECTION_DETAILS:
            newState.inspectionData = action.inspectionData;
            newState.consultationsDopData = [];
            newState.diagnoses = [];
            return newState;
        case SET_INSPECTION_COMMENTS:
            newState.consultationsDopData.push({data: action.data, index: action.index});
            return newState;
        case SET_ICD:
            newState.diagnoses.push({icd: action.icd, name: action.name});
            console.log(newState.diagnoses);
            return newState;
        default:
            return newState;
    }
}

export function setInspectionDataActionCreator(data){
    return {type: SET_INSPECTION_DETAILS, inspectionData: data}
}

export function setInspectionCommentsActionCreator(data, index){
    return {type: SET_INSPECTION_COMMENTS, data: data, index: index}
}

export function setIcdActionCreator(name, icd, diagnos){
    console.log(icd);
    console.log("diagnos", diagnos);
    return {type: SET_ICD, name: name, icd: icd}
}

export function setInspectionDataThunkCreator(id, navigate) {
    return (dispatch) => {
        return inspectionsApi.getFullInspection(id, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                dispatch(setInspectionDataActionCreator(data));
        })
    }
}

export function getIcdIdsThunkCreator(diagnoses){
    return async (dispatch) => {
        for (const diagnos of diagnoses){
            const diag = await mkbApi.diagnosis(diagnos.name);
            if (!diag) {
                return;
            } else {
                dispatch(setIcdActionCreator(diagnos.name, diag[0].id, diagnos));
            }
        }
    }
}

export function getInspectionCommentsThunkCreator(id, index, navigate) {
    return (dispatch) => {
        return inspectionsApi.getInspectionComments(id, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                dispatch(setInspectionCommentsActionCreator(data, index));
        })
    }
}

export function postCommentThunkCreator(id, data,  navigate) {
    return (dispatch) => {
        return inspectionsApi.postComments(id, data, navigate)
            .then(data => {
                if (!data) {
                    return null;
                }
                return data;
        })
    }
}

export function editCommentThunkCreator(id, data, navigate) {
    return (dispatch) => {
        return inspectionsApi.editComments(id, data, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return (data);
        })
    }
}

export function editInspectionActionCreator(complaints, anamnesis, recomendations, diagnoses, conclusion, nextVisitDate, deathDate, navigate)
{
    return (dispatch, getState) => {
        const state = getState();
        const inspectionDetailsState = state.inspectionDetails;

        let check = true;
        let fails = "";

        if (!complaints || complaints.length < 1 || complaints.length > 5000) {
            check = false;
            fails += "Неправильный формат жалоб. ";
        }

        if (!anamnesis || anamnesis.length < 1 || anamnesis.length > 5000) {
            check = false;
            fails += "Неправильный формат анамнеза. ";
        }

        if (!recomendations || recomendations.length < 1 || recomendations.length > 5000) {
            check = false;
            fails += "Неправильный формат рекомендаций. ";
        }

        if (conclusion === "Disease"){
            const nextVisitDateDate = new Date(nextVisitDate);
            if (!nextVisitDateDate || isNaN(nextVisitDateDate.getTime())) {
                fails += "Необходимо ввести дату следующего осмотра. ";
                check = false;
            }else{
                if(nextVisitDateDate <= new Date(inspectionDetailsState.inspectionData.date)){
                    fails += "Следующий визит должен быть в будущем. ";
                    check = false;
                }
            }
        }

        if (conclusion === "Death"){
            const deathDateDate = new Date(deathDate);
            if (!deathDateDate || isNaN(deathDateDate.getTime())) {
                fails += "Необходимо ввести дату смерти. ";
                check = false;
            }else{
                if(deathDateDate >= new Date(inspectionDetailsState.inspectionData.date)){
                    fails += "Как пациент мог умереть позже осмотра? ";
                    check = false;
                }
            }
        }

        if (check === false) {
            console.log(fails);
            alert(fails);
        } else {
            let diagnosesList = [];
            inspectionDetailsState.inspectionData.diagnoses.map(diagnos => (
                diagnosesList.push({icdDiagnosisId: inspectionDetailsState.diagnoses.find(d => d.name === diagnos.name) ? inspectionDetailsState.diagnoses.find(d => d.name === diagnos.name).icd : null, description: diagnos.description, type: diagnos.type})
            ));
            diagnoses.map(diagnos => (
                diagnosesList.push({icdDiagnosisId: diagnos.id, description: diagnos.description, type: diagnos.type})
            ));
            const data = {
                anamnesis: anamnesis,
                complaints: complaints,
                treatment: recomendations,
                conclusion: conclusion,
                diagnoses: diagnosesList
            };
            switch (conclusion){
                case "Disease":
                    data.nextVisitDate = new Date(nextVisitDate).toISOString();
                    break;
                case "Death":
                    data.deathDate = new Date(deathDate).toISOString();
                    break;
            }

            console.log(data);
            
            return inspectionsApi.editInspection(inspectionDetailsState.inspectionData.id, data)
            .then(response => {
                if (response.status === 200) {
                    navigate(`/inspection/${inspectionDetailsState.inspectionData.id}`);
                } else {
                    throw new Error("Неизвестная ошибка при создании инспекции");
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
                        case 500:
                            alert(`Внутренняя ошибка сервера: ${error.response.data.message}`);
                            break;
                        case 404:
                            alert(`${error.response.data.message}`);
                            break;
                        default:
                            alert(`Произошла ошибка: ${error.message}`);
                            break;
                    }
                } else {
                    alert(`Произошла ошибка: ${error.message}`);
                }
            });
        }
    };
}

export default inspectionDetailsReducer;
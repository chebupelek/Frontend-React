import { specialtiesApi } from "../Api/specialtiesApi";

const SET_SPECS = "SET_SPECS";

let initialSpecsState = {
    specs: [
        {
            name: "",
            id: "",
            createTime: Date()
        }
    ]
}

const specsReducer = (state = initialSpecsState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_SPECS:
            newState.specs = action.specs;
            return newState;
        default:
            return newState;
    }
}

export function getSpecsActionCreator(data){
    return {type: SET_SPECS, specs: data}
}

export function getSpecsThunkCreator(name) {
    return (dispatch) => {
        return specialtiesApi.specialties(name)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getSpecsActionCreator(data));
        })
    }
}

export default specsReducer;
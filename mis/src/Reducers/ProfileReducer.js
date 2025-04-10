import { profileApi } from "../Api/profileApi";

const SET_PROFILE = "SET_PROFILE";

let initialPofileState = {
    profile: [
        {
            id: "",
            createTime: Date(),
            name: "",
            birthday: Date(),
            gender: "",
            email: "",
            phone: ""
          }
    ]
}

const profileReducer = (state = initialPofileState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_PROFILE:
            newState.profile = action.profile;
            return newState;
        default:
            return newState;
    }
}

export function getProfileActionCreator(data){
    return {type: SET_PROFILE, profile: data}
}

export function getProfileThunkCreator(navigate) {
    return (dispatch) => {
        return profileApi.getProfile(navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getProfileActionCreator(data));
        })
    }
}

export function setProfileThunkCreator(data, navigate) {
    return (dispatch) => {
        return profileApi.setProfile(data, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                dispatch(getProfileThunkCreator());
        })
    }
}

export default profileReducer;
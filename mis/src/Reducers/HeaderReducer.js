import { loginApi } from "../Api/loginApi";
import { profileApi } from "../Api/profileApi";
import { registrationApi } from "../Api/registrationApi";
import { logoutApi } from "../Api/logout";

const LOGIN = "LOGIN";
const SET_NAME = "SET_NAME";
const LOGOUT = "LOGOUT";

let initialHeaderState = {
    name: "",
    isAuth: localStorage.getItem('token') ? true : false
}

const headerReducer = (state = initialHeaderState, action) => {
    let newState = {...state};
    switch(action.type){
        case LOGIN:
            newState.isAuth = true;
            return newState;
        case LOGOUT:
            newState.name = "";
            newState.isAuth = false;
            return newState;
        case SET_NAME:
            newState.isAuth = true;
            newState.name = action.name;
            return newState;
        default:
            return newState;
    }
}

export function loginHeaderActionCreator(){
    return {type: LOGIN}
}

export function setNameActionCreator(name){
    return {type: SET_NAME, name: name}
}

export function logoutActionCreator(){
    return {type: LOGOUT}
}

export function loginThunkCreator(data, navigate) {
    return (dispatch) => {
        localStorage.clear();
        return loginApi.login(data)
            .then(response => {
                if(response !== null){
                    dispatch(loginHeaderActionCreator());
                    navigate("/");
                }
            })
    };
}

export function registrationThunkCreator(data, navigate) {
    return (dispatch) => {
        localStorage.clear();
        return registrationApi.registration(data)
            .then(response => {
                if(response !== null){
                    dispatch(loginHeaderActionCreator());
                    navigate("/");
                }
            })
    };
}

export function setNameThunkCreator(navigate) {
    return (dispatch) => {
        if (!localStorage.getItem('token')) {
            return null;
        }
        return profileApi.getProfile()
            .then(response => {
                if(response !== null){
                    dispatch(setNameActionCreator(response.name));
                }else{
                    localStorage.clear();
                    navigate("/login");
                    dispatch(logoutActionCreator());
                }
            })
    };
}

export function logoutThunkCreator(navigate) {
    return (dispatch) => {
        return logoutApi.logout()
            .then(response => {
                if(response !== null){
                    localStorage.clear();
                    dispatch(logoutActionCreator());
                    navigate("/login");
                }
            })
    };
}

export function logoutHeaderActionCreator(){
    return {type: LOGOUT}
}

export default headerReducer;
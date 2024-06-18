import routers from "../Router/routers";

function getProfile(){
    return fetch(routers.profile, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(response => {
        if(!response.ok){
            alert(response);
            return null;
        }
        return response.json();
    }).then(data =>{
        return data;
    }).catch(error=>{
        console.log(error.message);
        return null;
    });
}

function setProfile(data){
    return fetch(routers.profile, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        if(!response.ok){
            alert(response);
            return null;
        }
        return true;
    }).then(data =>{
        return true;
    }).catch(error=>{
        console.log(error.message);
        return null;
    });
}

export const profileApi = {
    getProfile : getProfile,
    setProfile : setProfile
}
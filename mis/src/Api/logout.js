import routers from "../Router/routers";

function logout() {
    return fetch(routers.logout, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(response => {
        if(!response.ok){
            alert(response);
            return null;
        }
        return true;
    }).then(data => {
        localStorage.clear();
        return true;
    }).catch(error => {
        console.log(error);
        return null;
    });
}

export const logoutApi = {
    logout : logout
}
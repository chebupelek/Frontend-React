import routers from "../Router/routers";

function login(body) {
    return fetch(routers.login, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => {
        if(!response.ok){
            alert(response);
            return null;
        }
        return response.json();
    }).then(data => {
        localStorage.setItem("token", data.token);
        return data;
    }).catch(error => {
        console.log(error);
        return null;
    });
}

export const loginApi = {
    login : login
}
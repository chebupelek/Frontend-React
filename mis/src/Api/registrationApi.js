import routers from "../Router/routers";

function registration(body) {
    return fetch(routers.registration, {
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
        console.log(error.message);
        return null;
    });
}

export const registrationApi = {
    registration : registration
}
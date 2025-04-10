import routers from "../Router/routers";

function specialties(name) {
    return fetch(routers.specialties+`?name=${name}&page=1&size=10`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log("response", response);
        if(!response.ok){
            alert(response);
            return null;
        }
        return response.json();
    }).then(data => {
        return data.specialties;
    }).catch(error => {
        console.log(error.message);
        return null;
    });
}

export const specialtiesApi = {
    specialties : specialties
}
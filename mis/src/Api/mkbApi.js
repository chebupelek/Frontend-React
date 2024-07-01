import routers from "../Router/routers";

function diagnosis(name) {
    return fetch(routers.mkb+`?request=${name}&page=1&size=100`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            alert(response);
            return null;
        }
        return response.json();
    }).then(data => {
        console.log("data", data);
        return data.records;
    }).catch(error => {
        console.log(error.message);
        return null;
    });
}

function roots() {
    return fetch(routers.mkbRoots, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(!response.ok){
            alert(response);
            return null;
        }
        return response.json();
    }).then(data => {
        return data;
    }).catch(error => {
        console.log(error.message);
        return null;
    });
}

export const mkbApi = {
    diagnosis : diagnosis,
    roots : roots
}
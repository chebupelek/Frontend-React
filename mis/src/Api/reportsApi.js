import routers from "../Router/routers";

function report(queryString) {
    return fetch(routers.report+`?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(response => {
        console.log("response", response);
        if(!response.ok){
            alert(response);
            return null;
        }
        return response.json();
    }).then(data => {
        console.log(data);
        return data;
    }).catch(error => {
        console.log(error.message);
        return null;
    });
}

export const reportApi = {
    report : report
}
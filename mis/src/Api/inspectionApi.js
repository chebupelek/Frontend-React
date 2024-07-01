import routers from "../Router/routers";

function getInspectionsList(queryParams){
    return fetch(routers.patients+'/'+queryParams, {
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

function getInspectionsChilds(id){
    return fetch(routers.inspection+`/${id}/chain`, {
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

function getPrevInspectionsList(pacientId, request){
    return fetch(routers.patients+`/${pacientId}/inspections/search?request=${request}`, {
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

function createInspection(patientId, data){
    console.log(data);
    console.log(routers.patients+`/${patientId}/inspections`);
    return fetch(routers.patients+`/${patientId}/inspections`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        return  response;
    }).catch(error=>{
        console.log(error.message);
        return null;
    });
}

function getFullInspection(id){
    return fetch(routers.inspection+`/${id}`, {
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

function getInspectionComments(id){
    return fetch(routers.consultation+`/${id}`, {
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

function postComments(id, data){
    return fetch(routers.consultation+`/${id}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                alert(errorData.message);
                return null;
            });
        }
        return true;
    }).then(data =>{
        return data;
    }).catch(error=>{
        console.log(error.message);
        return null;
    });
}

function editComments(id, data){
    console.log("routers.consultation+`/comment/${id}`", routers.consultation+`/comment/${id}`);
    return fetch(routers.consultation+`/comment/${id}`, {
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
        return data;
    }).catch(error=>{
        console.log(error.message);
        return null;
    });
}

function editInspection(id, data){
    return fetch(routers.inspection+`/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response;
    }).catch(error=>{
        console.log(error.message);
        return null;
    });
}

export const inspectionsApi = {
    getInspectionsList : getInspectionsList,
    getInspectionsChilds : getInspectionsChilds,
    getPrevInspectionsList : getPrevInspectionsList,
    createInspection : createInspection,
    getFullInspection : getFullInspection,
    getInspectionComments : getInspectionComments,
    postComments : postComments,
    editComments : editComments,
    editInspection : editInspection
}
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
    return fetch(routers.patients+`${pacientId}/inspections/search?request=${request}`, {
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

export const inspectionsApi = {
    getInspectionsList : getInspectionsList,
    getInspectionsChilds : getInspectionsChilds,
    getPrevInspectionsList : getPrevInspectionsList
}
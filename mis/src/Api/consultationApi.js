import routers from "../Router/routers";

function getConsultationsList(queryParams){
    console.log(routers.consultation+'/'+queryParams);
    return fetch(routers.consultation+'/'+queryParams, {
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


export const consultationsApi = {
    getConsultationsList : getConsultationsList,
}
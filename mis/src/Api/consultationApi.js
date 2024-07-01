import routers from "../Router/routers";

function getConsultationsList(queryParams, navigate) {
    console.log(routers.consultation + '/' + queryParams);
    return fetch(routers.consultation + '/' + queryParams, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                alert('Invalid arguments for filtration/pagination');
                return null;
            } else if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
                return null;
            } else if (response.status === 404) {
                alert('Not Found');
                return null;
            } else if (response.status === 500) {
                alert('Internal Server Error');
                return null;
            } else {
                alert(`HTTP error! Status: ${response.status}`);
                return null;
            }
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error fetching consultations:', error.message);
        return null;
    });
}


export const consultationsApi = {
    getConsultationsList : getConsultationsList,
}
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
            if (response.status === 400) {
                alert('Invalid arguments for filtration/pagination');
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
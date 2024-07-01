import routers from "../Router/routers";

function report(queryString, navigate) {
    return fetch(routers.report+`?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(response => {
        console.log("response", response);
        if(!response.ok){
            if (response.status === 400) {
                alert('Invalid arguments for filtration/pagination');
                return null;
            } else if (response.status === 401) {
                localStorage.clear();
                navigate("/login");
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
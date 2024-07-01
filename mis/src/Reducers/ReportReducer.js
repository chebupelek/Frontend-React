import { reportApi } from "../Api/reportsApi";

const SET_REPORT = "SET_REPORT";

let initialReportState = {
    data: {
        filters: {},
        records: [],
        summaryByRoot: {}
      }
}

const reportReducer = (state = initialReportState, action) => {
    let newState = {...state};
    switch(action.type){
        case SET_REPORT:
            newState.data = action.data;
            return newState;
        default:
            return newState;
    }
}

export function getReportActionCreator(data){
    return {type: SET_REPORT, data: data}
}

export function getReportThunkCreator(queryString, navigate) {
    return (dispatch) => {
        return reportApi.report(queryString, navigate)
            .then(data => {
                if (!data) {
                    return;
                }
                return dispatch(getReportActionCreator(data));
        })
    }
}

export default reportReducer;
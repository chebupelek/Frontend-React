import { DatePicker } from "antd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import { setNewInspectionDateActionCreator } from "../../../Reducers/CreateInspectionReducer";

function InspectionDate() {
    const dispatch = useDispatch();

    const inspectionDate = useSelector(state => state.createInspection.newInspectionData.inspectionDate);

    const handleSetNewInspectionDate = (value) => {
        if (value) {
            dispatch(setNewInspectionDateActionCreator(value.toISOString()));
        } else {
            dispatch(setNewInspectionDateActionCreator(""));
        }
    };

    return (
        <DatePicker
            format="DD.MM.YYYY HH:mm"
            showTime
            status={inspectionDate.status ? "" : "error"}
            style={{ width: "100%" }}
            onChange={handleSetNewInspectionDate}
            placeholder="Выберите дату"
        />
    );
}

export default InspectionDate;

import {Select} from "antd";
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPrevInspectionsListThunkCreator, setPrevInspectionFromSelectActionCreator, setPrevInspectionNameActionCreator } from "../../../Reducers/CreateInspectionReducer";
import { useNavigate } from "react-router-dom";


function PreviousInspectionSelect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const pacient = useSelector(state => state.patient.patient);

    const prevInspection = useSelector(state => state.createInspection.prevInspectionData);

    const prevInspectionList = useSelector(state => state.createInspection.prevInspectionsList);
    const handlePrevInspectionSearch = useCallback((value) => {
        dispatch(setPrevInspectionsListThunkCreator(pacient.id, value, navigate));
    }, [dispatch, pacient.id]);

    const handlePrevInspectionChange = (value, label) => {
        dispatch(setPrevInspectionNameActionCreator(label));
        dispatch(setPrevInspectionFromSelectActionCreator(pacient.id, value, label));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    useEffect(() => {
        console.log("prevInspection", prevInspection);
    }, [prevInspection]);

    return (
        <Select 
            status={prevInspection.prevInspectionStatus ? "" : "error"}
            style={{ width: '100%' }} 
            defaultValue={prevInspection.previousInspectionName !== "" ? prevInspection.previousInspectionName : null}
            showSearch 
            defaultActiveFirstOption={false} 
            filterOption={false} 
            onSearch={handlePrevInspectionSearch} 
            onChange={(value, option) => handlePrevInspectionChange(value, option.label)} 
            notFoundContent={null}
            placeholder="Выберете осмотр"
            options={(prevInspectionList || []).map((d) => ({
                value: d.id,
                label: `${formatDate(d.date)} ${d.diagnosis.code}-${d.diagnosis.name}`,
            }))}
        />
    );
}

export default PreviousInspectionSelect;
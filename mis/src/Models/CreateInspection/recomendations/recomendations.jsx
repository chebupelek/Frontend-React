import { Card, Typography, Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useImperativeHandle, forwardRef } from 'react';

import { setNewInspectionRecomendationsActionCreator } from "../../../Reducers/CreateInspectionReducer";

function Recomendations(props, ref){
    const dispatch = useDispatch();

    const [recomendations, setRecomendations] = useState();
    const recomendationsStatus = useSelector(state => state.createInspection.newInspectionData.recomendations.status);

    const handleSetNewInspectionRecomendations = () => {
        dispatch(setNewInspectionRecomendationsActionCreator(recomendations));
    };

    useImperativeHandle(ref, () => ({ handleSetNewInspectionRecomendations }));

    return (
        <Card style={{backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Рекомендации по лечению</Typography.Title>
            <Input.TextArea autoSize={{ minRows: 3 }} status={!recomendationsStatus ? "error" : ""} value={recomendations} onChange={e => setRecomendations(e.target.value)}/>
        </Card>
    );
};

export default forwardRef(Recomendations);

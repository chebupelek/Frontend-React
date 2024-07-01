import { Card, Typography, Input} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useImperativeHandle, forwardRef } from 'react';

import { setNewInspectionAnamnesisActionCreator } from "../../../Reducers/CreateInspectionReducer";

function Anamnesis(props, ref){
    const dispatch = useDispatch();

    const [anamnesis, setAnamnesis] = useState();
    const anamnesisStatus = useSelector(state => state.createInspection.newInspectionData.anamnesis.status);

    const handleSetNewInspectionAnamnesis = () => {
        dispatch(setNewInspectionAnamnesisActionCreator(anamnesis));
    };

    useImperativeHandle(ref, () => ({ handleSetNewInspectionAnamnesis }));

    return (
        <Card style={{ backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Анамнез заболевания</Typography.Title>
            <Input.TextArea autoSize={{ minRows: 3 }} status={!anamnesisStatus ? "error" : ""} value={anamnesis} onChange={e => setAnamnesis(e.target.value)}/>
        </Card>
    );
}

export default forwardRef(Anamnesis);
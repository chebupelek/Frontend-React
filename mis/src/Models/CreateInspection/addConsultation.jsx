import { Card, Typography } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { setNeedConsultationActionCreator } from "../../Reducers/CreateInspectionReducer";

import Consultations from "./consultations";

function AddConsultation(){
    const dispatch = useDispatch();

    const needConsultation = useSelector(state => state.createInspection.newInspectionData.needConsultation);
    const handleNeedConsultation = (value) => {
        dispatch(setNeedConsultationActionCreator(value));
    }

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76"}}>Добавить консультацию</Typography.Title>
            <Switch checked={needConsultation} onChange={(checked) => handleNeedConsultation(checked)} />
            {needConsultation && <Consultations/>}
        </Card>
    );
}

export default AddConsultation;
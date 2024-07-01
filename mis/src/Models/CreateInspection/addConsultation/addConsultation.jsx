import { Card, Typography, Switch, Space } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { setNeedConsultationActionCreator } from "../../../Reducers/CreateInspectionReducer";

import Consultations from "./consultations";

function AddConsultation(){
    const dispatch = useDispatch();

    const needConsultation = useSelector(state => state.createInspection.newInspectionData.needConsultation);
    const handleNeedConsultation = (value) => {
        dispatch(setNeedConsultationActionCreator(value));
    }

    return (
        <Card style={{ backgroundColor: '#f6f6fb' }}>
            <Space direction="vertical" size={"middle"} style={{ width: '100%' }} >
                <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Добавить консультацию</Typography.Title>
                <Space direction="horizontal" size={"middle"}>
                    <Switch checked={needConsultation} onChange={(checked) => handleNeedConsultation(checked)}/>
                    <Typography.Text strong>Требуется консультация</Typography.Text>
                </Space>
                {needConsultation && <Consultations/>}
            </Space>
        </Card>
    );
}

export default AddConsultation;
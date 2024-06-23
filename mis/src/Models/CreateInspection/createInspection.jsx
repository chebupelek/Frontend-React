import { Button, Card, Space, Typography } from "antd";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import ReInxpection from "./reInspection";
import Complaints from "./complaints";
import Anamnesis from "./anamnesis";
import AddConsultation from "./addConsultation";
import AddDiagnosis from "./createDiagnosis";
import Conclusion from "./conclusion";

function CreateInspection(){
    const navigate = useNavigate;

    const pacient = useSelector(state => state.patient.patient);

    useEffect(() => {
        if (!pacient) {
            navigate('/patients');
        }
    }, [pacient, navigate]);

    return (
        <div style={{ width: '75%' }}>
            <Space direction="vertical" size="middle" style={{width: "100%"}}>
                <Typography.Title>Создание осмотра</Typography.Title>
                <ReInxpection/>
                <Complaints/>
                <Anamnesis/>
                <AddConsultation/>
                <AddDiagnosis/>
                <Conclusion/>

                <Card style={{ width: '100%', boxSizing: 'border-box', alignContent: 'center', justifyContent: 'center'}}>
                    <Space direction="horizontal" size="middle">
                        <Button type="primary" >Добавnlk;pить диагноз</Button>
                        <Button type="primary" >mkl; диагноз</Button>
                    </Space>
                </Card>

            </Space>
        </div>
    );
}

export default CreateInspection;
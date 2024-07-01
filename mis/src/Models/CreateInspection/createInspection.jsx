import { Button, Card, Space, Typography } from "antd";
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import ReInxpection from "./reinspection/reInspection";
import Complaints from "./complaints/complaints";
import Anamnesis from "./anamnesis/anamnesis";
import AddConsultation from "./addConsultation/addConsultation";
import AddDiagnosis from "./addDiagnosis/createDiagnosis";
import Conclusion from "./conclusion/conclusion";
import Recomendations from "./recomendations/recomendations";

import { createInspectionActionCreator } from "../../Reducers/CreateInspectionReducer";

function CreateInspection() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const patient = useSelector(state => state.patient.patient);

    useEffect(() => {
        if (!patient || !patient.id) {
            navigate('/patients');
        }
    }, [patient, navigate]);

    const complaintsRef = useRef();
    const anamnesisRef = useRef();
    const recomendationsRef = useRef();

    const handleSaveInspection = () => {
        if (complaintsRef.current) {
            complaintsRef.current.handleSetNewInspectionComplaints();
        }
        if (anamnesisRef.current) {
            anamnesisRef.current.handleSetNewInspectionAnamnesis();
        }
        if (recomendationsRef.current) {
            recomendationsRef.current.handleSetNewInspectionRecomendations();
        }
        dispatch(createInspectionActionCreator(patient.id, navigate));
    };

    const handleRegistrationNavigation = () => {
        navigate(`/patient/${patient.id}`);
    };

    return (
        <div style={{ width: '75%', margin: '0 auto' }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Typography.Title>Создание осмотра</Typography.Title>
                <ReInxpection />
                <Complaints ref={complaintsRef} />
                <Anamnesis ref={anamnesisRef} />
                <AddConsultation />
                <AddDiagnosis />
                <Recomendations ref={recomendationsRef} />
                <Conclusion />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginBottom: '2%' }}>
                    <Space direction="horizontal" size="middle">
                        <Button type="primary" style={{backgroundColor: "#317cb9"}} onClick={handleSaveInspection}>Сохранить осмотр</Button>
                        <Button type="link" style={{ backgroundColor: '#d3d3eb', color: 'white'}} onClick={handleRegistrationNavigation}>Отмена</Button>
                    </Space>
                </div>
            </Space>
        </div>
    );
}

export default CreateInspection;

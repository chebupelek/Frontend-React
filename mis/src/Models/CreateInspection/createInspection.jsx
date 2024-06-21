import { Button, Col, Row, Card, Select, Space, Pagination, Radio, Typography, DatePicker } from "antd";
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { setNewInspectionAnamnesisActionCreator } from "../../Reducers/CreateInspectionReducer";

import ReInxpection from "./reInspection";
import Complaints from "./complaints";
import Anamnesis from "./anamnesis";
import AddConsultation from "./addConsultation";

function CreateInspection(){
    const dispatch = useDispatch();
    const navigate = useNavigate;

    const pacient = useSelector(state => state.patient.patient);

    useEffect(() => {
        if (!pacient) {
            navigate('/patients');
        }
    }, [pacient, navigate]);

    return (
        <div style={{ width: '75%' }}>
            <Space direction="vertical" size="middle">
                <Typography.Title>Создание осмотра</Typography.Title>
                <ReInxpection/>
                <Complaints/>
                <Anamnesis/>
                <AddConsultation/>
            </Space>
        </div>
    );
}

export default CreateInspection;
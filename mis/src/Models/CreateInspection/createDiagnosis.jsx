import { Card, Typography, Space, Select, Input, Radio, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from "react";

import { getDiagnosisThunkCreator } from "../../Reducers/MkbReducer";

import { setDiagnosisActionCreator } from "../../Reducers/CreateInspectionReducer";

import DiagnosisCard from "./diagnosisCard";

function AddDiagnosis(){
    const dispatch = useDispatch();

    const diagnosis = useSelector(state => state.mkb.diagnosis);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
    const handleDiagnosisSearch = useCallback((value) => {
        dispatch(getDiagnosisThunkCreator(value));
    }, [dispatch]);
    const handleDiagnosisChange = (value) => {
        setSelectedDiagnosis({
            id: value.value,
            code: value.lable.code,
            name: value.lable.name,
        });
    };

    const [description, setDescription] = useState('');

    const [type, setType] = useState('');

    const handleCreateDiagnosis = () => {
        const diagnosis = {
            id: selectedDiagnosis.id,
            code: selectedDiagnosis.code,
            name: selectedDiagnosis.name,
            description: description,
            type: type
        };
        setSelectedDiagnosis(null);
        setDescription('');
        setType('');
        dispatch(setDiagnosisActionCreator(diagnosis));
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76"}}>Диагнозы</Typography.Title>
            <Space direction="vertical" size="middle">
                <DiagnosisCard/>
                <Select style={{ width: '100%' }} showSearch value={selectedDiagnosis ? {value: selectedDiagnosis.id, label: `${selectedDiagnosis.code} - ${selectedDiagnosis.name}`} : null} labelInValue defaultActiveFirstOption={false} filterOption={false} onSearch={handleDiagnosisSearch} onChange={handleDiagnosisChange} notFoundContent={null} placeholder={"Специализация консультанта"} options={(diagnosis || []).map((d) => ({
                    value: d.id,
                    label: {code: d.code, name: d.name},
                }))}/>
                <Input style={{ width: '100%' }} value={description} onChange={value => setDescription(value)} />
                <Radio.Group style={{ width: '100%' }} value={type} onChange={value => setType(value)}>
                    <Radio value={"Main"}>Основной</Radio>
                    <Radio value={"Concomitant"}>Сопутсствующий</Radio>
                    <Radio value={"Complication"}>Осложнение</Radio>
                </Radio.Group>
                <Button type="primary" disabled={!selectedDiagnosis || !description || !type} onClick={handleCreateDiagnosis}>Добавить диагноз</Button>
            </Space>
        </Card>
    );
}

export default AddDiagnosis;
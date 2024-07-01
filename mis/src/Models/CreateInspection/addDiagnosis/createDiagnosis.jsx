import { Card, Typography, Space, Select, Input, Radio, Button } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import { getDiagnosisThunkCreator } from "../../../Reducers/MkbReducer";
import { setNewDiagnosisActionCreator } from "../../../Reducers/CreateInspectionReducer";

import DiagnosisCard from "./diagnosisCard";

function AddDiagnosis(){
    const dispatch = useDispatch();

    const diagnosis = useSelector(state => state.mkb.diagnosis);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('');

    const handleDisSearch = useCallback((value) => {
        dispatch(getDiagnosisThunkCreator(value));
    }, [dispatch]);

    const handleSpecialtyChange = (id, name) => {
        setSelectedDiagnosis({value: id, label: name});
    };


    const [description, setDescription] = useState('');
    const [type, setType] = useState('');

    const handleCreateDiagnosis = () => {
        dispatch(setNewDiagnosisActionCreator({
            id: selectedDiagnosis.value,
            name: selectedDiagnosis.label,
            description: description,
            type: type
        }));
        setSelectedDiagnosis({value: "", label: ""});
        setDescription('');
        setType('');
    };

    return (
        <Card style={{ backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Диагнозы</Typography.Title>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <DiagnosisCard/>  
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Text type="secondary" strong>Болезни</Typography.Text>
                    <Select 
                        style={{ width: '100%' }} 
                        value={selectedDiagnosis.label}
                        showSearch 
                        defaultActiveFirstOption={false} 
                        filterOption={false} 
                        onSearch={handleDisSearch} 
                        onChange={(value, option) => handleSpecialtyChange(value, option.label)} 
                        notFoundContent={null}
                        options={(diagnosis || []).map((d) => ({
                            value: d.id,
                            label: `${d.code} - ${d.name}`,
                        }))}
                    />
                    <Input style={{ width: '100%' }} value={description} onChange={(e) => setDescription(e.target.value)}/>
                    <Typography.Text type="secondary" strong>Тип диагноза в осмотре</Typography.Text>
                    <Radio.Group style={{ width: '100%' }} value={type} onChange={(e) => setType(e.target.value)}>
                        <Radio value={"Main"}>Основной</Radio>
                        <Radio value={"Concomitant"}>Сопутствующий</Radio>
                        <Radio value={"Complication"}>Осложнение</Radio>
                    </Radio.Group>
                    <Button type="primary"
                            disabled={selectedDiagnosis.label === "" || !type}
                            style={{backgroundColor: "#317cb9"}}
                            onClick={handleCreateDiagnosis}>
                                <PlusOutlined />
                                Добавить диагноз
                    </Button>
                </Space>  
            </Space>    
        </Card>
    );
}

export default AddDiagnosis;

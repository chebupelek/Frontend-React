import { Button, Select, Space, Typography, Input, Col, Row } from "antd";
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from "@ant-design/icons";

import { setConsultationActionCreator } from "../../../Reducers/CreateInspectionReducer";
import { getSpecsThunkCreator } from '../../../Reducers/SpecialtiesReducer';

import ConsultationCard from "./consultaionCard";

function Consultations(){
    const dispatch = useDispatch();

    const specs = useSelector(state => state.specs.specs);

    const [selectedSpec, setSelectedSpec] = useState('');
    const [comment, setComment] = useState('');

    const handleSpecSearch = useCallback((value) => {
        dispatch(getSpecsThunkCreator(value));
    }, [dispatch]);

    const handleSpecialtyChange = (id, name) => {
        setSelectedSpec({value: id, label: name});
    };

    const handleAddConsultation = () => {
        dispatch(setConsultationActionCreator({
            specialtyId: selectedSpec.value,
            specialtyName: selectedSpec.label,
            comment: comment
        }));
        setSelectedSpec({value: "", label: ""});
        setComment('');
    };

    return (
            <Row>
                <Col span={12}>
                <Space direction="vertical" size="large" style={{ width: '100%' }} >
                    <ConsultationCard/>
                    <Space direction="vertical" size="small" style={{ width: '100%' }} >
                        <Typography.Text type="secondary" strong>Специализация консультанта</Typography.Text>
                        <Select 
                            style={{ width: '100%' }} 
                            value={selectedSpec.value}
                            showSearch 
                            defaultActiveFirstOption={false} 
                            filterOption={false} 
                            onSearch={handleSpecSearch} 
                            onChange={(value, option) => handleSpecialtyChange(value, option.label)} 
                            notFoundContent={null}
                            options={(specs || []).map((d) => ({
                                value: d.id,
                                label: d.name,
                            }))}
                        />
                        <Typography.Text type="secondary" strong>Комментарий</Typography.Text>
                        <Input 
                            style={{ width: '100%' }} 
                            value={comment}  
                            onChange={(e) => setComment(e.target.value)} 
                        />
                        <Button type="primary" disabled={selectedSpec.name === "" || !comment} style={{backgroundColor: "#317cb9"}}onClick={handleAddConsultation}>
                            <PlusOutlined />
                            Добавить консультацию
                        </Button>
                    </Space>
                    </Space>
                </Col>
                <Col span={12}></Col>
            </Row>
    );
}

export default Consultations;

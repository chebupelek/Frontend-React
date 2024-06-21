import { Button, Card, Select, Space, Typography } from "antd";
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setConsultationActionCreator } from "../../Reducers/CreateInspectionReducer";
import { getSpecsThunkCreator } from '../../Reducers/SpecialtiesReducer';

import ConsultationCard from "./consultaionCard";

function Consultations(){
    const dispatch = useDispatch();

    const specs = useSelector(state => state.specs.specs);

    const [selectedSpec, setSelectedSpec] = useState(null);
    const [comment, setComment] = useState('');

    const handleSpecialtySearch = useCallback((value) => {
        dispatch(getSpecsThunkCreator(value));
    }, [dispatch]);

    const handleSpecialtyChange = (value) => {
        setSelectedSpec({
            value: value.value,
            lable: value.lable
        });
    };

    const handleAddConsultation = () => {
        dispatch(setConsultationActionCreator({
            specialtyId: selectedSpec.value,
            specialtyName: selectedSpec.label,
            comment: comment
        }));
        setSelectedSpec(null);
        setComment('');
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Space direction="vertical" size="middle">
                <ConsultationCard/>
                <Select style={{ width: '100%' }} labelInValue showSearch value={selectedSpec} defaultActiveFirstOption={false} filterOption={false} onSearch={handleSpecialtySearch} onChange={handleSpecialtyChange} notFoundContent={null} placeholder={"Специализация консультанта"} options={(specs || []).map((d) => ({
                    value: d.id,
                    label: d.name,
                }))}/>
                <Typography.Text>Комментарий</Typography.Text>
                <Input style={{ width: '100%' }} value={comment}  onChange={(e) => setComment(e.target.value)} />
                <Button type="primary" disabled={!selectedSpec || !comment} onClick={handleAddConsultation}>Добавить консультацию</Button>
            </Space>
        </Card>
    );
}

export default Consultations;
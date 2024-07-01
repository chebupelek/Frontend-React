import dayjs from 'dayjs';
import { Button, Card, Space, Typography, Row, Col, Flex, Modal, Input, Select, Radio, DatePicker } from "antd";
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

import { setInspectionDataThunkCreator, getIcdIdsThunkCreator } from '../../Reducers/InspectionDetailsReducer';
import { getProfileThunkCreator } from '../../Reducers/ProfileReducer'
import Consultation from './consultation';
import InspectionEdit from './modalCard';

function InspectionDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const profile = useSelector(state => state.profile.profile);
    const inspectionData = useSelector(state => state.inspectionDetails.inspectionData);

    useEffect(() => {
        dispatch(setInspectionDataThunkCreator(id,navigate));
        dispatch(getProfileThunkCreator());
        if(inspectionData){
            dispatch(getIcdIdsThunkCreator(inspectionData.diagnoses, navigate));
        }
    }, [id]);

    useEffect(() => {
        if(inspectionData){
            dispatch(getIcdIdsThunkCreator(inspectionData.diagnoses, navigate));
        }
    }, [inspectionData]);

    function formatDateString(dateString) {
        return dayjs(dateString).format('DD.MM.YYYY - HH:mm');
    }
    function formatBirthdate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }
    const translateGender = (gender) => {
        switch (gender) {
            case "Male":
                return "Мужской";
            case "Female":
                return "Женский";
            default:
                return gender;
        }
    };

    const translateType = (type) => {
        switch (type) {
            case "Main":
                return "Основной";
            case "Concomitant":
                return "Сопутствующий";
            case "Complication":
                return "Осложнение";
            default:
                return type;
        }
    };

    const modalRef = useRef();

    const showModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    return (
        <div style={{ width: '75%', marginTop: '2%', marginBottom: '2%' }}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Card style={{ backgroundColor: '#f6f6fb'}}>
                    <Row>
                        <Col span={20} justify={'flex-start'}>
                            <Flex justify={'flex-start'} vertical>
                                <Space direction="vertical" size='middle' style={{ width: '100%' }}>
                                    <Typography.Title style={{margin: 0}} level={1}>Амбулаторный осмотр от {inspectionData.date ? formatDateString(inspectionData.date) : ""}</Typography.Title>
                                    <Typography.Text strong>Пациент: {inspectionData.patient.name}</Typography.Text>
                                    <Typography.Text>Пол: {translateGender(inspectionData.patient.gender)}</Typography.Text>
                                    <Typography.Text>Дата рождения: {formatBirthdate(inspectionData.patient.birthday)}</Typography.Text>
                                    <Typography.Text type='secondary' strong>Медицинский работник: {inspectionData.doctor.name}</Typography.Text>
                                </Space>
                            </Flex>
                        </Col>
                        <Col span={4} justify={'flex-end'}>
                            <Flex justify={'flex-end'}>
                                {inspectionData.doctor.id === profile.id && <Button type="primary" style={{ backgroundColor: '#317cb9' }} onClick={showModal}>Редактировать осмотр</Button>}
                            </Flex>
                        </Col>
                    </Row>
                </Card>

                <Card style={{ backgroundColor: '#f6f6fb'}}>
                    <Space direction="vertical" size='middle' style={{ width: '100%' }}>
                        <Typography.Title style={{margin: 0}} level={3}>Жалобы</Typography.Title>
                        <Typography.Paragraph>{inspectionData.complaints}</Typography.Paragraph>
                    </Space>
                </Card>

                <Card style={{ backgroundColor: '#f6f6fb'}}>
                    <Space direction="vertical" size='middle' style={{ width: '100%' }}>
                        <Typography.Title style={{margin: 0}} level={3}>Анамнез заболевания</Typography.Title>
                        <Typography.Paragraph>{inspectionData.anamnesis}</Typography.Paragraph>
                    </Space>
                </Card>

                {inspectionData.consultations.map((consultation, index) => (<Consultation key={index} index={index} consultationData={consultation}/>))}


                <Card style={{ backgroundColor: '#f6f6fb'}}>
                    <Space direction="vertical" size='middle' style={{ width: '100%' }}>
                        <Typography.Title style={{margin: 0}} level={3}>Диагнозы</Typography.Title>
                        {inspectionData.diagnoses && 
                            inspectionData.diagnoses.map((diagnos, index) => (
                                <Space direction="vertical" key={index}>
                                    <Typography.Title level={4} strong>({diagnos.code}) {diagnos.name}</Typography.Title>
                                    <Typography.Text type="secondary" strong>Тип в осмотре: {translateType(diagnos.type)}</Typography.Text>
                                    <Typography.Text type="secondary" strong>Расшифровка: {diagnos.description}</Typography.Text>
                                </Space>
                            ))
                        }
                    </Space>
                </Card>

                <Card style={{ backgroundColor: '#f6f6fb'}}>
                    <Space direction="vertical" size='middle' style={{ width: '100%' }}>
                        <Typography.Title style={{margin: 0}} level={3}>Рекомендации по лечению</Typography.Title>
                        <Typography.Paragraph>{inspectionData.treatment}</Typography.Paragraph>
                    </Space>
                </Card>

                <Card style={{ backgroundColor: '#f6f6fb'}}>
                    <Space direction="vertical" size='middle' style={{ width: '100%' }}>
                        <Typography.Title style={{margin: 0}} level={3}>Заключение</Typography.Title>
                        <Typography.Text strong>{inspectionData.conclusion}</Typography.Text>
                        {inspectionData.conclusion === 'Disease' ?
                            <Typography.Text>Дата следующего визита: {formatDateString(inspectionData.nextVisitDate)}</Typography.Text> :
                            inspectionData.conclusion === 'Death' &&
                            <Typography.Text>Дата смерти: {formatDateString(inspectionData.deathDate)}</Typography.Text>
                        }
                    </Space>
                </Card>

                <InspectionEdit ref={modalRef}/>
            </Space>
        </div>
    );
}

export default InspectionDetails;

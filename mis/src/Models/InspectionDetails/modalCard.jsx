import { Button, Card, Space, Typography, Row, Col, Input, Select, Radio, DatePicker, Modal } from "antd";
import { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import { getDiagnosisThunkCreator } from '../../Reducers/MkbReducer'
import { editInspectionActionCreator } from "../../Reducers/InspectionDetailsReducer";
import { useNavigate } from "react-router-dom";

function InspectionEdit(props, ref) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    useImperativeHandle(ref, () => ({ showModal }));

    const handleCancel = () => {
        setIsModalVisible(false);
        setComplaints(inspectionData.complaints);
        setAnamnesis(inspectionData.anamnesis);
        setRecomendations(inspectionData.treatment);
        setSelectedDiagnosis('');
        setSelectedDiagnosisList([]);
        setDescription('');
        setConclusion(inspectionData.conclusion);
        setNextVisitDate(inspectionData.nextVisitDate ? inspectionData.nextVisitDate : "");
        setDeathDate(inspectionData.deathDate ? inspectionData.deathDate : "");
        setType('');
    };
    const inspectionData = useSelector(state => state.inspectionDetails.inspectionData);
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
    const [complaints, setComplaints] = useState(inspectionData.complaints);
    const [anamnesis, setAnamnesis] = useState(inspectionData.anamnesis);
    const [recomendations, setRecomendations] = useState(inspectionData.treatment);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
    const [diagnosisList, setSelectedDiagnosisList] = useState([]);
    const diagnosis = useSelector(state => state.mkb.diagnosis);
    const handleDisSearch = useCallback((value) => {
        dispatch(getDiagnosisThunkCreator(value));
    }, [dispatch]);
    const handleSpecialtyChange = (id, name) => {
        setSelectedDiagnosis({value: id, label: name});
    };
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const handleCreateDiagnosis = () => {
        let newDiagnosisList = diagnosisList;
        newDiagnosisList.push({
            id: selectedDiagnosis.value,
            name: selectedDiagnosis.label,
            description: description,
            type: type
        });
        setSelectedDiagnosisList(newDiagnosisList);
        setSelectedDiagnosis({value: "", label: ""});
        setDescription('');
        setType('');
    };
    const [conclusion, setConclusion] = useState(inspectionData.conclusion);
    const [nextVisitDate, setNextVisitDate] = useState(inspectionData.nextVisitDate ? inspectionData.nextVisitDate : "");
    const [deathDate, setDeathDate] = useState(inspectionData.deathDate ? inspectionData.deathDate : "");

    const editInspection = () => {
        dispatch(editInspectionActionCreator(complaints, anamnesis, recomendations, diagnosisList, conclusion, nextVisitDate, deathDate, navigate));
    }

    return (
        <Modal open={isModalVisible} onCancel={handleCancel} closeIcon={false} footer={null} width={'70%'}>
            <Space direction="vertical" size={"middle"} style={{width: "100%"}}>
                <Typography.Title level={1} style={{marginTop: '0'}}>Редактирование осмотра</Typography.Title>

                <Card style={{ backgroundColor: '#f6f6fb' }}>
                    <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Жалобы</Typography.Title>
                    <Input.TextArea autoSize={{ minRows: 3 }} value={complaints} onChange={e => setComplaints(e.target.value)}/>
                </Card>

                <Card style={{ backgroundColor: '#f6f6fb' }}>
                    <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Анамнез заболевания</Typography.Title>
                    <Input.TextArea autoSize={{ minRows: 3 }} value={anamnesis} onChange={e => setAnamnesis(e.target.value)}/>
                </Card>

                <Card style={{backgroundColor: '#f6f6fb' }}>
                    <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Рекомендации по лечению</Typography.Title>
                    <Input.TextArea autoSize={{ minRows: 3 }} value={recomendations} onChange={e => setRecomendations(e.target.value)}/>
                </Card>

                <Card style={{ backgroundColor: '#f6f6fb' }}>
                    <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Диагнозы</Typography.Title>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>

                        <Space direction="vertical" size="large">
                            {inspectionData.diagnoses && 
                                inspectionData.diagnoses.map((diagnos, index) => (
                                    <Space direction="vertical" key={index}>
                                        <Typography.Title level={4} strong>({diagnos.code}) {diagnos.name}</Typography.Title>
                                        <Typography.Text type="secondary" strong>Тип в осмотре: {translateType(diagnos.type)}</Typography.Text>
                                        <Typography.Text type="secondary" strong>Расшифровка: {diagnos.description}</Typography.Text>
                                    </Space>
                                ))
                            }
                            {diagnosisList && 
                                diagnosisList.map((diagnos, index) => (
                                    <Space direction="vertical" key={inspectionData.diagnoses.length + index}>
                                        <Typography.Title level={4} strong>{diagnos.name}</Typography.Title>
                                        <Typography.Text type="secondary" strong>Тип в осмотре: {translateType(diagnos.type)}</Typography.Text>
                                        <Typography.Text type="secondary" strong>Расшифровка: {diagnos.description}</Typography.Text>
                                    </Space>
                                ))
                            }
                        </Space>

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

                <Card style={{ backgroundColor: '#f6f6fb' }}>
                    <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Заключение</Typography.Title>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                <Typography.Text type="secondary" strong>Заключение</Typography.Text>
                                <Select style={{ width: '100%' }} value={conclusion} onChange={value => setConclusion(value)}>
                                    <Select.Option value="Disease">Болезнь</Select.Option>
                                    <Select.Option value="Recovery">Выздоровление</Select.Option>
                                    <Select.Option value="Death">Смерть</Select.Option>
                                </Select>
                            </Space>
                        </Col>
                        <Col span={12}>
                            {conclusion === "Disease" ? 
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Typography.Text type="secondary" strong>Дата следующего визита</Typography.Text>
                                    <DatePicker 
                                        format="YYYY-MM-DD HH:mm"
                                        value={nextVisitDate && moment(nextVisitDate)}
                                        showTime
                                        style={{ width: '100%' }}
                                        onChange={value => setNextVisitDate(value.toISOString())} 
                                        placeholder="Выберите дату"
                                    />
                                </Space> : 
                                conclusion === "Death" ? 
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Typography.Text type="secondary" strong>Дата и время смерти</Typography.Text>
                                    <DatePicker 
                                        format="YYYY-MM-DD HH:mm"
                                        value={deathDate && moment(deathDate)}
                                        showTime
                                        style={{ width: '100%' }} 
                                        onChange={value => setDeathDate(value.toISOString())} 
                                        placeholder="Выберите дату" 
                                    />
                                </Space> : 
                                <></>
                            }
                        </Col>
                    </Row>
                </Card>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginBottom: '2%' }}>
                    <Space direction="horizontal" size="middle">
                        <Button type="primary" style={{backgroundColor: "#317cb9"}} onClick={editInspection}>Сохранить изменения</Button>
                        <Button type="link" style={{ backgroundColor: '#d3d3eb', color: 'white'}} onClick={handleCancel}>Отмена</Button>
                    </Space>
                </div>

            </Space>
        </Modal>
    );
}

export default forwardRef(InspectionEdit);
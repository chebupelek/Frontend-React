import { Card, Col, Row, Button, Space } from "antd";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { setPrevInspectionNameActionCreator, clearDataActionCreator, setPrevInspectionFromSelectActionCreator } from "../../Reducers/CreateInspectionReducer";

function InspectionCard(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const translateConclusion = (conclusion) => {
        switch (conclusion) {
            case "Death":
                return "Смерть";
            case "Disease":
                return "Болезнь";
            case "Recovery":
                return "Выздоравливание";
            default:
                return conclusion;
        }
    };
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }

    const handleInspectionChildCreate = () => {
        
        dispatch(clearDataActionCreator());
        dispatch(setPrevInspectionNameActionCreator(`${formatDate(props.createTime)} ${props.diagnosis.code}-${props.diagnosis.name}`));
        dispatch(setPrevInspectionFromSelectActionCreator(props.patient.id, props.inspectionId, `${formatDate(props.createTime)} ${props.diagnosis.code}-${props.diagnosis.name}`));
        navigate('/inspection/create');
    }

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: props.conclusion !== 'Death' ? '#f6f6fb' : '#ffefe8', marginTop: '1%', cursor: 'pointer'}}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Space direction="horizontal" size="small">
                        <span style={{ backgroundColor: '#7b7f9b', color: "white" }}>{formatDate(props.createTime)}</span>
                        <span><strong>Амбулаторный осмотр</strong></span>
                    </Space>
                </Col>
                <Col>
                    <Space direction="horizontal" size="small">
                        {props.conclusion !== 'Death' && !props.hasNested && (<Button type="link" style={{ color: "#317dba" }} onClick={handleInspectionChildCreate}><strong><FormOutlined/> Добавить осмотр</strong></Button>)}
                        <Button type="link" style={{ color: "#317dba" }} onClick={() => navigate(`/inspection/${props.inspectionId}`)}><strong><SearchOutlined /> Детали осмотра</strong></Button>
                    </Space>
                </Col>
            </Row>
            <div>
                <span><strong>Заключение - {translateConclusion(props.conclusion)}</strong></span>
            </div>
            <div>
                <span><strong>Основной диагноз - {props.diagnosis.name}</strong></span>
            </div>
            <div>
                <span>Медицинский работник - {props.doctor}</span>
            </div>
        </Card>
    );
}

export default InspectionCard;
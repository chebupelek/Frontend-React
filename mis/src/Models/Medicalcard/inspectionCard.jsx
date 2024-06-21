import { Card, Col, Row, Button, Space } from "antd";
import { FormOutlined, SearchOutlined } from "@ant-design/icons";

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

function InspectionCard(props) {
    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: props.conclusion !== 'Death' ? '#f6f6fb' : '#ffefe8', marginTop: '1%'}}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Space direction="horizontal" size="small">
                        <span style={{ backgroundColor: '#7b7f9b', color: "white" }}>{formatDate(props.createTime)}</span>
                        <span><strong>Амбулаторный осмотр</strong></span>
                    </Space>
                </Col>
                <Col>
                    <Space direction="horizontal" size="small">
                        {props.conclusion !== 'Death' && !props.hasNested && (<Button type="link" style={{ color: "#317dba" }}><strong><FormOutlined/> Добавить осмотр</strong></Button>)}
                        <Button type="link" style={{ color: "#317dba" }}><strong><SearchOutlined /> Детали осмотра</strong></Button>
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
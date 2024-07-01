import { Card, Col, Row, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function ConsultationCard(props) {
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

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb', marginTop: '1%', cursor: 'pointer'}}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Space direction="horizontal" size="small">
                        <span style={{ backgroundColor: '#7b7f9b', color: "white" }}>{formatDate(props.createTime)}</span>
                        <span><strong>Амбулаторный осмотр</strong></span>
                    </Space>
                </Col>
                <Col>
                    <Space direction="horizontal" size="small">
                        <Button type="link" style={{ color: "#317dba" }} onClick={() => navigate(`/inspection/${props.consultationId}`)}><strong><SearchOutlined /> Детали осмотра</strong></Button>
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

export default ConsultationCard;
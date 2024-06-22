import { Col, Card, Space, Typography } from "antd";
import { useSelector } from 'react-redux';

function DiagnosisCard(){
    const diagnosis = useSelector(state => state.createInspection.newInspectionData.diagnosis);

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

    return (
        <div>
            {diagnosis ? 
                <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
                    <Space direction="vertical" size="middle">
                        {diagnosis.map(diagnos, index => (
                            <Col key={index}>
                                <Typography.Text level={5}>({diagnos.code}) {diagnos.name}</Typography.Text>
                                <Typography.Text>Тип в осмотре: {translateType(diagnos.type)}</Typography.Text>
                                <Typography.Text>Расщифровка: {diagnos.description}</Typography.Text>
                            </Col>
                        ))}
                    </Space>
                </Card> :
                <></>
            }
        </div>
    );
}

export default DiagnosisCard;
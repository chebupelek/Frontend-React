import { Col, Card, Space, Typography } from "antd";
import { useSelector } from 'react-redux';

function DiagnosisCard(){
    const diagnosis = useSelector(state => state.createInspection.newInspectionData.diagnosis);

    return (

        <div>
            {diagnosis ? 
                <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
                    <Space direction="vertical" size="middle">
                        {diagnosis.map((diagnos, index) => (
                            <Col key={index}>
                                <Typography.Text level={4} strong>({diagnos.code}) - {diagnos.name}</Typography.Text>
                                <Typography.Text>Тип в осмотре: {diagnos.type}</Typography.Text>
                                <Typography.Text>Расшифровка: {diagnos.description}</Typography.Text>
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
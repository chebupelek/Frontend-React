import { Col, Card, Space, Typography } from "antd";
import { useSelector } from 'react-redux';

function ConsultationCard(){
    const consultations = useSelector(state => state.createInspection.newInspectionData.consultations);

    return (

        <div>
            {consultations ? 
                <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
                    <Space direction="vertical" size="middle">
                        {consultations.map(consultation, index => (
                            <Col key={index}>
                                <Typography.Text>Специализация консультанта - {consultation.specialtyName}</Typography.Text>
                                <Typography.Text>{consultation.comment}</Typography.Text>
                            </Col>
                        ))}
                    </Space>
                </Card> :
                <></>
            }
        </div>
    );
}

export default ConsultationCard;
import { Col, Space, Typography } from "antd";
import { useSelector } from 'react-redux';

function ConsultationCard(){
    const consultations = useSelector(state => state.createInspection.newInspectionData.consultations);

    return (
        <Space direction="vertical" size="middle">
            {consultations.map((consultation, index) => (
                <Col key={index}>
                    <Space direction="vertical" size={"small"}>
                        <Space direction="horizontal" size={'middle'}>
                            <Typography.Text strong>Специализация консультанта:</Typography.Text>
                            <Typography.Text>{consultation.specialtyName}</Typography.Text>
                        </Space>
                        <Space direction="horizontal" size={'middle'}>
                            <Typography.Text strong>Комментарий:</Typography.Text>
                            <Typography.Text>{consultation.comment}</Typography.Text>
                        </Space>
                    </Space>
                </Col>
            ))}
        </Space>     
    );
}

export default ConsultationCard;
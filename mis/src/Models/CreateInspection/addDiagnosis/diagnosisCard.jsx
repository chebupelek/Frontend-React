import { Col, Card, Space, Typography } from "antd";
import { useEffect } from "react";
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
        <Space direction="vertical" size="large">
            {diagnosis && 
                diagnosis.map((diagnos, index) => (
                    <Space direction="vertical" key={index}>
                        <Typography.Title level={4} strong>{diagnos.name}</Typography.Title>
                        <Typography.Text type="secondary" strong>Тип в осмотре: {translateType(diagnos.type)}</Typography.Text>
                        <Typography.Text type="secondary" strong>Расшифровка: {diagnos.description}</Typography.Text>
                    </Space>
                ))
            }
        </Space>
    );
}

export default DiagnosisCard;
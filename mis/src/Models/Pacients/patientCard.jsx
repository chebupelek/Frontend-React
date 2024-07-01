import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

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

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function PatientCard(props) {
    const navigate = useNavigate();

    const handlePatientClick = (patientId) => {
        navigate(`/patient/${patientId}`);
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb', marginTop: '1%', cursor: 'pointer'}} onClick={() => handlePatientClick(props.patientId)}>
            <Typography.Title level={4} style={{margin: 0}}>{props.name}</Typography.Title>
            <div>Пол - <strong>{translateGender(props.gender)}</strong></div>
            <div>Дата рождения - <strong>{formatDate(props.birthday)}</strong></div>
        </Card>
    );
}

export default PatientCard;
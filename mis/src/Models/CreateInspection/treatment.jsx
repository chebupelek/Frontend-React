import { Card, Typography} from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { setNewInspectionTreatmentActionCreator } from "../../Reducers/CreateInspectionReducer";

function Treatment(){
    const dispatch = useDispatch();

    const treatment = useSelector(state => state.createInspection.newInspectionData.treatment);
    const handleSetNewInspectionTreatment = (value) => {
        dispatch(setNewInspectionTreatmentActionCreator(value));
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76"}}>Жалобы</Typography.Title>
            <Input status={!treatment.status ? "error" : ""} style={{ width: '100%' }} value={treatment.data} onChange={value => handleSetNewInspectionTreatment(value)}/>
        </Card>
    );
}

export default Treatment;
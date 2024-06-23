import { Card, Typography, Input} from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { setNewInspectionComplaintsActionCreator } from "../../Reducers/CreateInspectionReducer";

function Complaints(){
    const dispatch = useDispatch();

    const complaints = useSelector(state => state.createInspection.newInspectionData.complaints);
    const handleSetNewInspectionComplaints = (value) => {
        dispatch(setNewInspectionComplaintsActionCreator(value));
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76"}}>Жалобы</Typography.Title>
            <Input status={!complaints.status ? "error" : ""} style={{ width: '100%' }} value={complaints.data} onChange={value => handleSetNewInspectionComplaints(value)}/>
        </Card>
    );
}

export default Complaints;
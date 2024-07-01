import { Card, Typography, Input } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useImperativeHandle, forwardRef } from 'react';

import { setNewInspectionComplaintsActionCreator } from "../../../Reducers/CreateInspectionReducer";

function Complaints(props, ref){
    const dispatch = useDispatch();

    const [complaints, setComplaints] = useState();
    const complaintsStatus = useSelector(state => state.createInspection.newInspectionData.complaints.status);

    const handleSetNewInspectionComplaints = () => {
        dispatch(setNewInspectionComplaintsActionCreator(complaints));
    };

    useImperativeHandle(ref, () => ({ handleSetNewInspectionComplaints }));

    return (
        <Card style={{ backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Жалобы</Typography.Title>
            <Input.TextArea autoSize={{ minRows: 3 }} status={!complaintsStatus ? "error" : ""} value={complaints} onChange={e => setComplaints(e.target.value)}/>
        </Card>
    );
};

export default forwardRef(Complaints);

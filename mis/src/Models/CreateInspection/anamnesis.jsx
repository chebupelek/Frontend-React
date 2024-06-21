import { Card, Typography} from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { setNewInspectionAnamnesisActionCreator } from "../../Reducers/CreateInspectionReducer";

function Anamnesis(){
    const dispatch = useDispatch();

    const anamnesis = useSelector(state => state.createInspection.newInspectionData.anamnesis);
    const handleSetNewInspectionAnamnesis = (value) => {
        dispatch(setNewInspectionAnamnesisActionCreator(value));
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76"}}>Анамнез заболевания</Typography.Title>
            <Input status={!anamnesis.status ? "error" : ""} style={{ width: '100%' }} value={anamnesis.data} onChange={value => handleSetNewInspectionAnamnesis(value)}/>
        </Card>
    );
}

export default Anamnesis;
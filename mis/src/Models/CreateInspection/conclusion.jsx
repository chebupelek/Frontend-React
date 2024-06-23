import { Col, Row, Card, Select, Typography, DatePicker } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { setConclusionActionCreator, setNextVisitDateActionCreator, setDeathDateActionCreator } from "../../Reducers/CreateInspectionReducer";

function Conclusion(){
    const dispatch = useDispatch();

    const conclusion = useSelector(state => state.createInspection.newInspectionData.conclusion);
    const handleSetNewInspectionconclusion = (value) => {
        dispatch(setConclusionActionCreator(value));
    };

    const nextVisitDate = useSelector(state => state.createInspection.newInspectionData.nextVisitDate);
    const handleSetNewInspectionNextVisitDate = (value) => {
        dispatch(setNextVisitDateActionCreator(value));
    };

    const deathDate = useSelector(state => state.createInspection.newInspectionData.deathDate);
    const handleSetNewInspectionDeathDate = (value) => {
        dispatch(setDeathDateActionCreator(value));
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76"}}>Заключение</Typography.Title>
            <Row gutter={16}>
                <Col span={12}>
                    <span>Заключение</span>
                    <Select style={{ width: '100%' }} value={conclusion} onChange={value => handleSetNewInspectionconclusion(value)}>
                        <Select.Option value="Disease">Болезнь</Select.Option>
                        <Select.Option value="Recovery">Выздоровление</Select.Option>
                        <Select.Option value="Death">Смерть</Select.Option>
                    </Select>
                </Col>
                <Col span={12}>
                    {conclusion === "Disease" ? 
                        <div>
                            <span>Дата следующего осмотра</span>
                            <DatePicker style={{ width: '100%' }} value={nextVisitDate ? nextVisitDate : null} onChange={date => handleSetNewInspectionNextVisitDate(date)} placeholder="Выберите дату" />
                        </div> : 
                        conclusion === "Death" ? 
                        <div>
                            <span>Дата смерти</span>
                            <DatePicker style={{ width: '100%' }} value={deathDate ? deathDate : null} onChange={date => handleSetNewInspectionDeathDate(date)} placeholder="Выберите дату" />
                        </div> : 
                        <></>
                    }
                </Col>
            </Row>
        </Card>
    );
}

export default Conclusion;
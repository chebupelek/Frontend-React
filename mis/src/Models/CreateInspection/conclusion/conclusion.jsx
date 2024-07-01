import { Col, Row, Card, Select, Typography, DatePicker, Space } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { setConclusionActionCreator, setNextVisitDateActionCreator, setDeathDateActionCreator } from "../../../Reducers/CreateInspectionReducer";

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
        <Card style={{ backgroundColor: '#f6f6fb' }}>
            <Typography.Title level={4} style={{color: "#1a3f76", marginTop: 0}}>Заключение</Typography.Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Typography.Text type="secondary" strong>Заключение</Typography.Text>
                        <Select style={{ width: '100%' }} value={conclusion} onChange={value => handleSetNewInspectionconclusion(value)}>
                            <Select.Option value="Disease">Болезнь</Select.Option>
                            <Select.Option value="Recovery">Выздоровление</Select.Option>
                            <Select.Option value="Death">Смерть</Select.Option>
                        </Select>
                    </Space>
                </Col>
                <Col span={12}>
                    {conclusion === "Disease" ? 
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <Typography.Text type="secondary" strong>Дата следующего визита</Typography.Text>
                            <DatePicker 
                                format="YYYY-MM-DD HH:mm"
                                showTime
                                style={{ width: '100%' }}
                                onChange={value => value && handleSetNewInspectionNextVisitDate(value.toISOString())} 
                                placeholder="Выберите дату"
                            />
                        </Space> : 
                        conclusion === "Death" ? 
                        <Space direction="vertical" size="small" style={{ width: '100%' }}>
                            <Typography.Text type="secondary" strong>Дата и время смерти</Typography.Text>
                            <DatePicker 
                                format="YYYY-MM-DD HH:mm"
                                showTime
                                style={{ width: '100%' }} 
                                onChange={value => value && handleSetNewInspectionDeathDate(value.toISOString())} 
                                placeholder="Выберите дату" 
                            />
                        </Space> : 
                        <></>
                    }
                </Col>
            </Row>
        </Card>
    );
}

export default Conclusion;
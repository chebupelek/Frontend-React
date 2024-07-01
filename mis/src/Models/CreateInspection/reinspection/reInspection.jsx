import { Row, Card, Space, Typography, Switch, Col, Flex } from "antd";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManOutlined, WomanOutlined } from "@ant-design/icons";

import { setIsAgainActionCreator } from "../../../Reducers/CreateInspectionReducer";

import PreviousInspectionSelect from "./previousInspectionSelect"
import InspectionDate from "./inspectionDate"

function ReInxpection() {
    const dispatch = useDispatch();

    const pacient = useSelector(state => state.patient.patient);

    const isAgain = useSelector(state => state.createInspection.prevInspectionData.isAgain);
    const handleIsAgain = (value) => {
        dispatch(setIsAgainActionCreator(value));
    }

    const birthdate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };


    return (
        <Card style={{ backgroundColor: '#f6f6fb'}}>
            <Row>
                <Col span={12} justify={'flex-start'}>
                    <Flex justify={'flex-start'} vertical>
                        <Space direction="vertical" size='middle'>
                            <Typography.Title style={{margin: 0}} level={2}>{pacient.name} {pacient.gender === "Male" ? <ManOutlined style={{color: '#1c79b9'}}/> : <WomanOutlined />}</Typography.Title>
                            <Space direction="horizontal" size="middle">
                                <Typography.Text strong style={{ color: !isAgain ? "#1c79b9" : "black" }}>Первичный осмотр</Typography.Text>
                                <Switch checked={isAgain} onChange={(checked) => handleIsAgain(checked)} />
                                <Typography.Text strong style={{ color: isAgain ? "#1c79b9" : "black" }}>Повторный осмотр</Typography.Text>
                            </Space>
                                {isAgain ? 
                                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Typography.Text type="secondary" strong>Предыдущий осмотр</Typography.Text>
                                            <PreviousInspectionSelect/>
                                        </Space>
                                        <Space direction="vertical" style={{ width: '100%'}}>
                                            <Typography.Text type="secondary" strong>Дата осмотра</Typography.Text>
                                            <InspectionDate/>
                                        </Space>
                                    </Space> 
                                    : 
                                    <Space direction="vertical" style={{ width: '100%'}}>
                                        <Typography.Text type="secondary" strong>Дата осмотра</Typography.Text>
                                        <InspectionDate/>
                                    </Space>
                                }
                            </Space>
                    </Flex>
                </Col>
                <Col span={12} justify={'flex-end'}>
                    <Flex justify={'flex-start'}>
                        <Typography.Text strong style={{ marginLeft: "auto" }}>Дата рождения: {birthdate(pacient.birthday)}</Typography.Text>
                    </Flex>
                </Col>
            </Row>
        </Card>
    );
}

export default ReInxpection;
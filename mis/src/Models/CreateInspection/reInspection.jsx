import { Row, Card, Select, Space, Typography, DatePicker } from "antd";
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ManOutlined } from "@ant-design/icons";
import { WomanOutlined } from "@ant-design/icons";

import { setPrevInspectionsListThunkCreator, setIsAgainActionCreator, setPrevInspectionActionCreator, setNewInspectionDateActionCreator } from "../../Reducers/CreateInspectionReducer";

function ReInxpection(){
    const dispatch = useDispatch();

    const pacient = useSelector(state => state.patient.patient);

    const isAgain = useSelector(state => state.createInspection.prevInspectionData.isAgain);
    const handleIsAgain = (value) => {
        dispatch(setIsAgainActionCreator(value));
    }

    const prevInspection = useSelector(state => state.createInspection.prevInspectionData);
    const prevInspectionList = useSelector(state => state.createInspection.prevInspectionsList);
    const handlePrevInspectionSearch = useCallback((value) => {
        dispatch(setPrevInspectionsListThunkCreator(pacient.id, value));
    }, [dispatch]);
    const handlePrevInspectionChange = (value) => {
        dispatch(setPrevInspectionActionCreator(value.value, value.label.date, value.label.code, value.label.name));
    };

    const inspectionDate = useSelector(state => state.createInspection.newInspectionData.inspectionDate);
    const handleSetNewInspectionDate = (value) => {
        dispatch(setNewInspectionDateActionCreator(value));
    };

    const birthdate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
            <Row align="middle">
                <Typography.Title level={2}>{pacient.name}{pacient.gender === "Male" ? <ManOutlined/> : <WomanOutlined/>}</Typography.Title>
                <Typography.Text strong style={{marginLeft: "auto"}}>Дата рождения - {birthdate(pacient.birthday)}</Typography.Text>
            </Row>
            <Space direction="horizontal" size="middle">
                <Typography.Text style={{color: !isAgain ? "#1c79b9" : "black"}}>Первичный осмотр</Typography.Text>
                <Switch checked={isAgain} onChange={(checked) => handleIsAgain(checked)}/>
                <Typography.Text style={{color: isAgain ? "#1c79b9" : "black"}}>Повторный осмотр</Typography.Text>
            </Space>
            <Space direction="vertical" size="middle">
                {isAgain ? 
                    <div>
                        <Typography.Text>Предыдущий осмотр</Typography.Text>
                        <Select
                            status={!prevInspection.prevInspectionStatus ? "error" : ""}
                            style={{width: "50%"}}
                            showSearch
                            value={{ value: prevInspection.previousInspectionId, label: `${formatDate(prevInspection.previousInspectionDate)} ${prevInspection.previousInspectionCode}-${prevInspection.previousInspectionName}` }}
                            labelInValue
                            defaultActiveFirstOption={false}
                            filterOption={false}
                            onSearch={handlePrevInspectionSearch}
                            onChange={handlePrevInspectionChange}
                            notFoundContent={null}
                            options={(prevInspectionList || []).map((d) => ({
                                value: d.id,
                                label: { date: d.diagnosis.date, code: d.diagnosis.code, name: d.diagnosis.name },
                            }))}
                        />
                    </div> : <></>
                }
                <div>
                    <Typography.Text>Дата осмотра</Typography.Text>
                    <DatePicker 
                        status={!inspectionDate.status ? "error" : ""} 
                        style={{width: "50%"}} 
                        value={inspectionDate.data} 
                        onChange={value => handleSetNewInspectionDate(value)} 
                        placeholder="Выберите дату"
                    />
                </div>
            </Space>
        </Card>
    );
}

export default ReInxpection;
import { useState, useEffect } from 'react';
import { Card, Space, Input, Select, Button, Row, Col, DatePicker, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getReportThunkCreator } from '../../Reducers/ReportReducer';
import { getRootsThunkCreator } from "../../Reducers/MkbReducer";
import moment from 'moment';

function Report(){ 
    const dispatch = useDispatch(); 
    const data = useSelector(state =>state.report.data);
    const [records, setRecords] = useState();
    const [columns, setColumns] = useState();
    const [isTrue, setIsTrue] = useState(false);

    const [start, setStart] = useState(null);
    const handleSetStart = (date) => {
        if (date) {
            const formattedDate = date.format('DD.MM.YYYY');
            setStart(formattedDate);
        }
    };

    const [finish, setFinish] = useState(null);
    const handleSetFinish = (date) => {
        if (date) {
            const formattedDate = date.format('DD.MM.YYYY');
            setFinish(formattedDate);
        }
    };

    const roots = useSelector(state => state.mkb.roots);
    const [mkbRoots, setMkbRoots] = useState([]);
    const handleRootsChange = (value) => {
        setMkbRoots(value);
    };
    useEffect(() => {
        dispatch(getRootsThunkCreator());
    }, []);

    useEffect(() => {
        console.log(data);
        if (data.records.length > 0) {
            const newRecords = data.records.map((record, index) => {
                const genderTranslation = {
                    'Male': 'Мужской',
                    'Female': 'Женский'
                };
                const row = {
                    key: `${record.patientName}-${index}`,
                    patientName: record.patientName,
                    patientBirthdate: record.patientBirthdate,
                    gender: genderTranslation[record.gender] || record.gender,
                };
                data.filters.icdRoots.forEach(root => {
                    row[root] = record.visitsByRoot[root] || 0;
                });
                return row;
            });
            setRecords(newRecords);
            const newColumns = [
                {
                    title: 'Имя пациента',
                    dataIndex: 'patientName',
                    key: 'patientName',
                },
                {
                    title: 'Дегь рождения',
                    dataIndex: 'patientBirthdate',
                    key: 'patientBirthdate',
                },
                {
                    title: 'Пол',
                    dataIndex: 'gender',
                    key: 'gender',
                },
                ...data.filters.icdRoots.map(root => ({
                    title: root,
                    dataIndex: root,
                    key: root,
                })),
            ];
            setColumns(newColumns);
            setIsTrue(true);
        } else {
            setIsTrue(false);
        }
    }, [data]);

    const isButtonDisabled = !start || !finish || moment(start, 'DD.MM.YYYY').isAfter(moment(finish, 'DD.MM.YYYY'));

    const handleSearch = () => {
        const queryParams = [
            `start=${(moment(start, 'DD.MM.YYYY')).toISOString()}`,
            `end=${(moment(finish, 'DD.MM.YYYY')).toISOString()}`,
            ...mkbRoots.map(root => `icdRoots=${root}`),
        ].filter(Boolean).join('&');
        dispatch(getReportThunkCreator(queryParams));
    };

      return (
        <Space direction='vertical' size='large' style={{width: '100%', marginTop: '2%'}}>
            <Row>
                <Col span={3}></Col>
                <Col span={18}>
                    <Typography.Title level={2} style={{marginTop: '0'}}>Отчёт</Typography.Title>
                    <Card style={{ boxSizing: 'border-box', backgroundColor: '#f6f6fb'}}>
                        <Space direction='vertical' size={'middle'} style={{width: '100%'}}>
                            <Row>
                                <Col span={12}>
                                    <Typography.Text type="secondary" strong>Дата с</Typography.Text>
                                    <DatePicker
                                        format="DD.MM.YYYY"
                                        style={{ width: "100%" }}
                                        onChange={handleSetStart}
                                        placeholder="Выберите дату"
                                    />
                                </Col>
                                <Col span={12}>
                                    <Typography.Text type="secondary" strong>Дата по</Typography.Text>
                                    <DatePicker
                                        format="DD.MM.YYYY"
                                        style={{ width: "100%" }}
                                        onChange={handleSetFinish}
                                        placeholder="Выберите дату"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Typography.Text type="secondary" strong>МКБ-10</Typography.Text>
                                <Select 
                                    mode="multiple" 
                                    style={{ width: '100%' }} 
                                    showSearch 
                                    value={mkbRoots} 
                                    defaultActiveFirstOption={false} 
                                    optionFilterProp="label" 
                                    onChange={handleRootsChange} 
                                    notFoundContent={null} 
                                    options={(roots || []).map((d) => ({
                                        value: d.id,
                                        label: d.name,
                                    }))}
                                />
                            </Row>
                            <Row>
                                <Button type="primary" block style={{ backgroundColor: '#317dba', marginLeft: 'auto' }}  disabled={isButtonDisabled} onClick={handleSearch}> Сгенерировать</Button>
                            </Row>
                        </Space>
                    </Card>
                </Col>
                <Col span={3}></Col>
            </Row>
            {isTrue && <Table dataSource={records} columns={columns} pagination={false}/>}
        </Space>
      );
};

export default Report;
import { Button, Col, Row, Card, Select, Space, Pagination, Radio  } from "antd";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRootsThunkCreator } from "../../Reducers/MkbReducer";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { getConsultationsListThunkCreator } from "../../Reducers/ConsultationReducer";
import ConsultationCard from "./consultationCard";
import ConsultationGroupedCard from "./consultaionGroupedCard";

function ConsultationsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const roots = useSelector(state => state.mkb.roots);
    const consultations = useSelector(state => state.consultationsList.consultations);
    const pagination = useSelector(state => state.consultationsList.pagination);

    const [group, setGroup] = useState(false);
    const [mkbRoots, setMkbRoots] = useState([""]);
    const [selectedSize, setSelectedSize] = useState("5");
    const [selectedPage, setSelectedPage] = useState("1");

    const [groupRender, setGroupRender] = useState(false);

    const handleRootsChange = (value) => {
        setMkbRoots(value);
    };

    const changeGroup = (e) => {
        setGroup(e.target.value);
    };

    useEffect(() => {
        const groupParam = searchParams.get('grouped') || "";
        const mkbRootsParam = searchParams.getAll('icdRoots');
        const sizeParam = searchParams.get('size') || 5;
        const pageParam = searchParams.get('page') || 1;

        setGroup(groupParam === 'true');
        setMkbRoots(mkbRootsParam);
        setSelectedSize(sizeParam);
        setSelectedPage(pageParam);
        setGroupRender(groupParam === 'true');

        const queryParams = [
            `grouped=${groupParam}`,
            ...mkbRootsParam.map(root => `icdRoots=${root}`),
            `page=${pageParam}`,
            `size=${sizeParam}`
        ].filter(Boolean).join('&');

        const consultationsUrl = `?${queryParams}`;
        dispatch(getConsultationsListThunkCreator(consultationsUrl, navigate));
        dispatch(getRootsThunkCreator());
    }, [searchParams, dispatch]);

    const handleSearch = () => {
        const queryParams = [
            `grouped=${group}`,
            ...mkbRoots.map(root => `icdRoots=${root}`),
            `page=${1}`,
            `size=${selectedSize}`
        ].filter(Boolean).join('&');
        setSelectedPage(1);
        setSearchParams(queryParams);
    };

    const handleChangePage = (page) => {
        setSelectedPage(page.toString());
        searchParams.set('page', page.toString());
        setSearchParams(searchParams);
    };

    return (
        <div style={{ width: '75%' }}>
            <Row align="middle">
                <h1>Консультации</h1>
            </Row>
            <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16} align="middle">
                            <Col span={12}>
                                <span>МКБ-10</span>
                                <Select mode="multiple" style={{ width: '100%' }} showSearch value={mkbRoots} defaultActiveFirstOption={false} optionFilterProp="label" onChange={handleRootsChange} notFoundContent={null} options={(roots || []).map((d) => ({
                                    value: d.id,
                                    label: d.name,
                                }))}/>
                            </Col>
                            <Col span={4}></Col>
                            <Col span={8}>
                                <Radio.Group style={{ width: '100%' }} value={group} onChange={changeGroup}>
                                    <Radio value={true}>Сгрупировать по повторным</Radio>
                                    <Radio value={false}>Показать всё</Radio>
                                </Radio.Group>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16} align="middle">
                            <Col span={8}>
                                <span>Число осмотровв на странице</span>
                                <Select style={{ width: '100%' }} value={selectedSize} onChange={value => setSelectedSize(value)}>
                                    <Select.Option value="1">1</Select.Option>
                                    <Select.Option value="2">2</Select.Option>
                                    <Select.Option value="3">3</Select.Option>
                                    <Select.Option value="4">4</Select.Option>
                                    <Select.Option value="5">5</Select.Option>
                                    <Select.Option value="6">6</Select.Option>
                                    <Select.Option value="7">7</Select.Option>
                                    <Select.Option value="8">8</Select.Option>
                                    <Select.Option value="9">9</Select.Option>
                                    <Select.Option value="10">10</Select.Option>
                                </Select>
                            </Col>
                            <Col span={8}></Col>
                            <Col span={8}>
                                <Button type="primary" block style={{ backgroundColor: '#317dba', marginLeft: 'auto' }} onClick={handleSearch}>
                                    Поиск
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Space>
            </Card>
            {consultations ? <div><Row gutter={16} style={{ marginTop: '2%' }}>
                {consultations.map(consultation => (
                    <Col key={consultation.id} span={24 / (window.innerWidth > 1200 ? 2 : 1)}>
                        {groupRender ? <ConsultationGroupedCard 
                            isBordered={false}
                            conclusion={consultation.conclusion} 
                            createTime={consultation.date} 
                            diagnosis={consultation.diagnosis} 
                            doctor={consultation.doctor} 
                            consultationId={consultation.id} 
                            hasChain={consultation.hasChain} 
                            hasNested={consultation.hasNested}
                            num={1}
                        /> : <ConsultationCard conclusion={consultation.conclusion} createTime={consultation.date} diagnosis={consultation.diagnosis} doctor={consultation.doctor} consultationId={consultation.id} hasNested={consultation.hasNested}/>}
                    </Col>
                ))}
            </Row>
            <Row justify="center" style={{ marginTop: '2%' }}>
                <Pagination current={parseInt(selectedPage)} pageSize={parseInt(1)} total={pagination.count} onChange={page => handleChangePage(page)} showSizeChanger={false} />
            </Row></div> : <></>}
        </div>
    );
}

export default ConsultationsList;

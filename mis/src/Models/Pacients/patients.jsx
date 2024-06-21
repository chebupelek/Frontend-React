import { Button, Col, Row, Card, Select, Input, Switch, Space, Pagination, Modal, DatePicker } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientsListThunkCreator } from "../../Reducers/PatientsListReducer";
import { setNewPacientThunkCreator } from "../../Reducers/PatientsListReducer";
import { useSearchParams } from "react-router-dom";
import PatientCard from "./patientCard";

function Patients() {
    const dispatch = useDispatch();
    const patients = useSelector(state => state.patients.patients)  || [];
    const pagination = useSelector(state => state.patients.pagination);

    const [searchParams, setSearchParams] = useSearchParams();

    const [name, setName] = useState("");
    const [selectedConclusion, setSelectedConclusion] = useState([]);
    const [planed, setPlaned] = useState(false);
    const [my, setMy] = useState(false);
    const [selectedSort, setSelectedSort] = useState("");
    const [selectedSize, setSelectedSize] = useState("5");
    const [selectedPage, setSelectedPage] = useState("1");

    useEffect(() => {
        const nameParam = searchParams.get('name') || "";
        const conclusionsParam = searchParams.getAll('conclusions');
        const sortingParam = searchParams.get('sorting') || "";
        const scheduledVisitsParam = searchParams.get('scheduledVisits') || "";
        const onlyMineParam = searchParams.get('onlyMine') || "";
        const sizeParam = searchParams.get('size') || 5;
        const pageParam = searchParams.get('page') || 1;

        setName(nameParam);
        setSelectedConclusion(conclusionsParam);
        setSelectedSort(sortingParam);
        setPlaned(scheduledVisitsParam);
        setMy(onlyMineParam);
        setSelectedSize(sizeParam);
        setSelectedPage(pageParam);

        const queryParams = [
            nameParam ? `name=${encodeURIComponent(nameParam)}` : '',
            ...conclusionsParam.map(conclusion => `conclusions=${conclusion}`),
            sortingParam ? `sorting=${sortingParam}` : '',
            scheduledVisitsParam ? `scheduledVisits=${scheduledVisitsParam}`: '',
            onlyMineParam ? `onlyMine=${onlyMineParam}` : '',
            `page=${pageParam}`,
            `size=${sizeParam}`
        ].filter(Boolean).join('&');
        dispatch(getPatientsListThunkCreator(queryParams));
    }, [searchParams]);

    const handleSearch = () => {
        const queryParams = [
            name ? `name=${encodeURIComponent(name)}` : '',
            ...selectedConclusion.map(conclusion => `conclusions=${conclusion}`),
            selectedSort ? `sorting=${selectedSort}` : '',
            planed ? `scheduledVisits=${planed}`: '',
            my ? `onlyMine=${my}` : '',
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

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPacientName, setNewPacientName] = useState();
    const [newPacientGender, setNewPacientGender] = useState();
    const [newPacientBirthdate, setNewPacientBirthdate] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddNewPacient = () => {
        if (!newPacientName || !newPacientGender || !newPacientBirthdate) {
            alert("Все поля должны быть заполнены");
            return;
        }
        const newPacientData = {
            name: newPacientName,
            gender: newPacientGender,
            birthday: newPacientBirthdate.toISOString()
        };
        dispatch(setNewPacientThunkCreator(newPacientData));
    };

    return (
        <div style={{ width: '75%' }}>
            <Row align="middle">
                <h1>Пациенты</h1>
                <Button type="primary" style={{ backgroundColor: '#317dba', marginLeft: 'auto' }} onClick={showModal} icon={<UserAddOutlined/> }>
                    Регистрация нового пациента
                </Button>
            </Row>
            <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <h2>Фильтры и сортировка</h2>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <span>Имя</span>
                                <Input style={{ width: '100%' }} value={name} onChange={e => setName(e.target.value)} />
                            </Col>
                            <Col span={12}>
                                <span>Имеющиеся заключения</span>
                                <Select mode="multiple" style={{ width: '100%' }} value={selectedConclusion} onChange={value => setSelectedConclusion(value)}>
                                    <Select.Option value="Disease">Болезнь</Select.Option>
                                    <Select.Option value="Recovery">Выздоровление</Select.Option>
                                    <Select.Option value="Death">Смерть</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16} align="middle">
                            <Col span={8}>
                                <Space direction="horizontal" size="middle">
                                    <Switch checked={planed} onChange={checked => setPlaned(checked)} />
                                    <span>Есть запланированные визиты</span>
                                </Space>
                            </Col>
                            <Col span={8}>
                                <Space direction="horizontal" size="middle">
                                    <Switch checked={my} onChange={checked => setMy(checked)} />
                                    <span>Мои пациенты</span>
                                </Space>
                            </Col>
                            <Col span={8}>
                                <span>Сортировка пациентов</span>
                                <Select style={{ width: '100%' }} value={selectedSort} onChange={value => setSelectedSort(value)}>
                                    <Select.Option value="NameAsc">По имени пациента (от А-Я)</Select.Option>
                                    <Select.Option value="NameDesc">По имени пациента (от Я-А)</Select.Option>
                                    <Select.Option value="CreateAsc">По дате создания (сначала новые)</Select.Option>
                                    <Select.Option value="CreateDesc">По дате создания (сначала старые)</Select.Option>
                                    <Select.Option value="InspectionAsc">По дате осмотров (сначала новые)</Select.Option>
                                    <Select.Option value="InspectionDesc">По дате осмотров (сначала старые)</Select.Option>
                                </Select>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ width: '100%' }}>
                        <Row gutter={16} align="middle">
                            <Col span={8}>
                                <span>Число пациентов на странице</span>
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
            {patients ? 
                <div>
                    <Row gutter={16} style={{ marginTop: '2%' }}>
                        {patients.map(patient => (
                            <Col key={patient.id} span={24 / (window.innerWidth > 1200 ? 2 : 1)}>
                                <PatientCard name={patient.name} gender={patient.gender} birthday={patient.birthday} patientId={patient.id}/>
                            </Col>
                        ))}
                    </Row>
                    <Row justify="center" style={{ marginTop: '2%' }}>
                        <Pagination current={parseInt(selectedPage)} pageSize={parseInt(1)} total={pagination.count} onChange={page => handleChangePage(page)} showSizeChanger={false} />
                    </Row>
                </div> : 
            <></>}
            <Modal open={isModalVisible} onCancel={handleCancel} closeIcon={false} footer={[<Button key="submit" type="primary" onClick={handleAddNewPacient} block style={{backgroundColor: "#317cb9"}}>Зарегистрировать</Button>]}>
                <Space direction="vertical" size={"middle"} style={{width: "100%"}}>
                <h1>Регистрация нового пациента</h1>
                <div style={{ width: '100%' }}>
                    <span>Имя</span>
                    <Input style={{ width: '100%' }} value={newPacientName} onChange={e => setNewPacientName(e.target.value)} placeholder="Введите имя" />
                </div>
                <div style={{ width: '100%' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span>Пол</span>
                            <Select style={{ width: '100%' }} value={newPacientGender} onChange={value => setNewPacientGender(value)} placeholder="Выберите пол">
                                <Select.Option value="Male">Мужской</Select.Option>
                                <Select.Option value="Female">Женский</Select.Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <span>Дата рождения</span>
                            <DatePicker style={{ width: '100%' }} value={newPacientBirthdate} onChange={date => setNewPacientBirthdate(date)} placeholder="Выберите дату" />
                        </Col>
                    </Row>
                </div>
                </Space>
            </Modal>
        </div>
    );
}

export default Patients;
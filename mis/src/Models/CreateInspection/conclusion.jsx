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
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb' }}>
           <Row gutter={16} align="middle">
                <Col span={8}>
                    <span>Число пациентов на странице</span>
                    <Select style={{ width: '100%' }} value={selectedSize} onChange={value => setSelectedSize(value)}>
                        <Select.Option value="Disease">Болезнь</Select.Option>
                        <Select.Option value="Recovery">Выздоравливание</Select.Option>
                        <Select.Option value="Death">Смерть</Select.Option>
                    </Select>
                </Col>
                <Col span={8}></Col>
                <Col span={8}>
                    <Button type="primary" block style={{ backgroundColor: '#317dba', marginLeft: 'auto' }} onClick={handleSearch}>
                        Поиск
                    </Button>
                </Col>
            </Row>
        </Card>
    );
}

export default Patients;
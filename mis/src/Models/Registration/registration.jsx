import React, { useState, useCallback } from 'react';
import { Card, Space, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registrationThunkCreator } from '../../Reducers/HeaderReducer';
import { getSpecsThunkCreator } from '../../Reducers/SpecialtiesReducer';

const Registration = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedSpec, setSelectedSpec] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const specs = useSelector(state => state.specs.specs);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSpecialtySearch = useCallback((value) => {
        dispatch(getSpecsThunkCreator(value));
    }, [dispatch]);

    const handleSpecialtyChange = (value) => {
        setSelectedSpec(value);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        return re.test(phone);
    };

    const handleRegister = () => {
        if (!name || !gender || !selectedSpec || !email || !password) {
            alert("Все поля должны быть заполнены");
            return;
        }

        if (!validateEmail(email)) {
            alert("Введите корректный email");
            return;
        }

        const registrationData = {
            name: name,
            gender: gender,
            speciality: selectedSpec,
            email: email,
            password: password
        };

        if (birthdate) registrationData.birthday = birthdate.toISOString();
        if (phone){
            if (!validatePhone(phone)) {
                alert("Введите номер телефона в формате +7 (xxx) xxx-xx-xx");
                return;
            } else {
                registrationData.phone = phone;
            }
        }

        dispatch(registrationThunkCreator(registrationData, navigate));
    };

    return (
        <Card style={{ width: '33%', boxSizing: 'border-box', marginTop: '5%', backgroundColor: '#f6f6fb', boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}>
            <Space direction='vertical' size='middle' style={{ width: '100%' }}>
                <h1>Регистрация</h1>
                <div style={{ width: '100%' }}>
                    <span>Имя</span>
                    <Input style={{ width: '100%' }} value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
                </div>
                <div style={{ width: '100%' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <span>Пол</span>
                            <Select style={{ width: '100%' }} value={gender} onChange={value => setGender(value)} placeholder="Выберите пол">
                                <Select.Option value="Male">Мужской</Select.Option>
                                <Select.Option value="Female">Женский</Select.Option>
                            </Select>
                        </Col>
                        <Col span={12}>
                            <span>Дата рождения</span>
                            <DatePicker style={{ width: '100%' }} value={birthdate} onChange={date => setBirthdate(date)} placeholder="Выберите дату" />
                        </Col>
                    </Row>
                </div>
                <div style={{ width: '100%' }}>
                    <span>Телефон</span>
                    <Input style={{ width: '100%' }} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (xxx) xxx-xx-xx" />
                </div>
                <div style={{ width: '100%' }}>
                    <span>Специальность</span>
                    <Select style={{ width: '100%' }} showSearch value={selectedSpec} defaultActiveFirstOption={false} filterOption={false} onSearch={handleSpecialtySearch} onChange={handleSpecialtyChange} notFoundContent={null} options={(specs || []).map((d) => ({
                        value: d.id,
                        label: d.name,
                    }))}/>
                </div>
                <div style={{ width: '100%' }}>
                    <span>Email</span>
                    <Input style={{ width: '100%' }} value={email} onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" />
                </div>
                <div style={{ width: '100%' }}>
                    <span>Пароль</span>
                    <Input style={{ width: '100%' }} value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <Button type="primary" style={{ width: '100%', backgroundColor: '#317cb9' }} onClick={handleRegister}>Зарегистрироваться</Button>
                </div>
            </Space>
        </Card>
    );
};

export default Registration;
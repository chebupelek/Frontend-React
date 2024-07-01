import { useState, useEffect } from 'react';
import { Card, Space, Input, Select, Button, Row, Col, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunkCreator } from '../../Reducers/ProfileReducer';
import { setProfileThunkCreator } from '../../Reducers/ProfileReducer';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Profile(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProfileThunkCreator(navigate));
    }, []);

    const profileData = useSelector(state => state.profile.profile);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthdate, setBirthdate] = useState(null);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (profileData) {
            setName(profileData.name || '');
            setGender(profileData.gender || '');
            setBirthdate(profileData.birthday);
            setPhone(profileData.phone || '');
            setEmail(profileData.email || '');
        }
    }, [profileData]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhone = (phone) => {
        const re = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
        return re.test(phone);
    };

    const handleSaveChange = () => {
        const updatedProfile = {};

        if (name) updatedProfile.name = name;
        if (gender) updatedProfile.gender = gender;
        if (birthdate) updatedProfile.birthday = birthdate.toISOString();
        if (phone){
            if (!validatePhone(phone)) {
                alert("Введите номер телефона в формате +7 (xxx) xxx-xx-xx");
                return;
            } else {
                updatedProfile.phone = phone;
            }
        }
        if (email){
            if (!validateEmail(email)) {
                alert("Введите корректный email");
                return;
            } else {
                updatedProfile.email = email;
            }
        }

        dispatch(setProfileThunkCreator(updatedProfile, navigate));
    };

    return (
        <Card style={{ width: '33%', boxSizing: 'border-box', marginTop: '5%', backgroundColor: '#f6f6fb', boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)' }}>
            <Space direction='vertical' size='middle' style={{ width: '100%' }}>
                <h1>Профиль</h1>
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
                            <DatePicker style={{ width: '100%' }} value={birthdate ? moment(birthdate) : null} onChange={date => setBirthdate(date)} placeholder="Выберите дату" />
                        </Col>
                    </Row>
                </div>
                <div style={{ width: '100%' }}>
                    <span>Телефон</span>
                    <Input style={{ width: '100%' }} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+7 (xxx) xxx-xx-xx" />
                </div>
                <div style={{ width: '100%' }}>
                    <span>Email</span>
                    <Input style={{ width: '100%' }} value={email} onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" />
                </div>
                <div>
                    <Button type="primary" style={{ width: '100%', backgroundColor: '#317cb9' }} onClick={handleSaveChange}>Сохранить изменения</Button>
                </div>
            </Space>
        </Card>
    );
};

export default Profile;
import { Route, Routes, Navigate  } from 'react-router-dom';
import {Layout} from 'antd'

import Login from '../Login/Login';
import Registration from '../Registration/registration';
import Profile from '../Profile/profile';
import Patients from '../Pacients/patients';
import MedicalCard from '../Medicalcard/medicalCard';


function Base(){
    return (
        <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
                <Route path="/" element={localStorage.getItem('token') ? <Navigate to="/" /> : <Navigate to="/login" />}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/patients" element={<Patients/>} />
                <Route path="/patient/:id" element={<MedicalCard/>}/> 
            </Routes>
        </Layout.Content>
    )
}

export default Base;
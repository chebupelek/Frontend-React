import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from 'antd';

import Login from '../Login/Login';
import Registration from '../Registration/registration';
import Profile from '../Profile/profile';
import Patients from '../Pacients/patients';
import MedicalCard from '../Medicalcard/medicalCard';
import CreateInspection from '../CreateInspection/createInspection';
import InspectionDetails from '../InspectionDetails/inspectionDetails';
import ConsultationsList from '../Consultation/consultationsList';
import Report from '../Report/report';

function Base() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Navigating to:', location.pathname);
    }, [location]);

    return (
        <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
                <Route path="/" element={localStorage.getItem('token') ? <Navigate to="/patients" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/patient/:id" element={<MedicalCard />} />
                <Route path='/inspection/create' element={<CreateInspection />} />
                <Route path='/inspection/:id' element={<InspectionDetails />} />
                <Route path='/consultation' element={<ConsultationsList />} />
                <Route path='/reports' element={<Report/>}/>
            </Routes>
        </Layout.Content>
    );
}

export default Base;

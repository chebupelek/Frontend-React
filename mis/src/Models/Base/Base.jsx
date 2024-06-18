import { Route, Routes, Navigate  } from 'react-router-dom';
import {Layout} from 'antd'

import Login from '../Login/Login';
import Registration from '../Registration/registration';
import Profile from '../Profile/profile';

function Base(){
    return (
        <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
                <Route path="/"/>
                <Route path="/login" element={<Login/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Layout.Content>
    )
}

export default Base;
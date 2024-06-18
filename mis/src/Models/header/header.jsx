import { Layout, Avatar, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Links from './links';
import ProfileMenu from './profileMenu';
import Logo from './Logo.png'

function Header(){
    const dispatch = useDispatch();

    return(
        <Layout.Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1a3f76'}}>
            <Space direction='horizontal' size={'large'}>
                <Avatar src={Logo} alt="Skull" size={40}/>
                <div style={{ color: 'white', lineHeight: '1', textAlign: 'right' }}>
                    <h3 style={{ display: 'block', margin: '0' }}>Try not to</h3>
                    <h3 style={{ display: 'block', margin: '0' }}>DIE</h3>
                </div>
                <Links/>
            </Space>
            <ProfileMenu/>
        </Layout.Header>
    );
}

export default Header;
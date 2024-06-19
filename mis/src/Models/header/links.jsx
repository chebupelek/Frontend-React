import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

function Links() {
    const stateLog = useSelector(state => state.header.isAuth);
    
    return (
        <>
            {(stateLog) ? (
                <Space direction='horizontal' size={'large'}>
                    <Link to="/patients" style={{ color: 'white'}}>Пациенты</Link>
                    <Link to="/" style={{ color: 'white'}}>Консультации</Link>
                    <Link to="/" style={{ color: 'white' }}>Отчеты и статистика</Link>
                </Space>
            ) : (
                <></>
            )}
        </>
    );
}

export default Links;
import React, { useEffect } from 'react';
import * as Actions from './store/actions';
import { useDispatch } from 'react-redux';
import FiltersHotel from './components/FiltersHotel';
import { Layout } from 'antd';
import Navbar from './components/Navbar';

const { Sider, Content } = Layout;

const App = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getHotels())
    }, [dispatch])

    return (
        <div className='container'>
            <Layout className='p-20'>
                <Sider theme='light' width='35%'>
                    <Navbar />
                </Sider>
                <Content>
                    <FiltersHotel />
                </Content>
            </Layout>
        </div>
    );
}

export default App;

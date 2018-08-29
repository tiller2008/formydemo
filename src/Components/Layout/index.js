import React, { Component } from 'react';
import { Layout, Icon, Badge } from 'antd';
import Slider from '../Slider';
import MainRouter from '../../routes/MainRouter';
import './index.less';

const { Header } = Layout;

export default class MainLayout extends Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header className="header">
                    <div className="logo" />
                    {/* <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu> */}
                    <div className="quick-menu">
                        <ul>
                            <li>
                                <a className="signin">
                                    <Icon type="user" />
                                </a>
                            </li>
                            <li>
                                <Badge className="icon-save" count={0} showZero>
                                    <Icon type="save" />
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </Header>
                <Layout>
                    <Slider />
                    <MainRouter />
                </Layout>
            </Layout>
        );
    }
}
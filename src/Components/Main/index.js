import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import AppRoutes from '../../routes/AppRoutes';
import './index.less';
import Utils from '../../Utils/utils';

const { Content, Footer } = Layout;

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: null
        }
    }

    componentWillMount() {
        this.getData();
        if (!this.props.match.params.catalog)
            return <div>Sorry, there is no APP</div>
    }

    getData() {
        Utils.ajax('/menu.json', m => {
            let menu = JSON.parse(m).menu;
            this.setState({ menu: menu });
        });
    }

    handleSelectOrUnSelect(idx) {
        let icon = this.state.icon;
        icon[idx].selected = !this.state.icon[idx].selected;
        this.setState({ 'array': { ...icon, icon } })
    }

    render() {
        if (!this.state.menu) {
            return <div>loading...</div>
        }

        // 通过类别来帅选显示应用
        const filter = this.props.match.url.split('/').join('');    // split和join联合可以全部替换，若单个替换可以使用replace

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item >
                        <Link to='/'>首页</Link>
                    </Breadcrumb.Item>
                    {
                        this.state.menu.map((m, idx) => {
                            return (
                                m.name === filter ?
                                    <Breadcrumb.Item key={idx}>{m.title}</Breadcrumb.Item> : null
                            )
                        })
                    }
                </Breadcrumb>
                <div className="main">
                    <AppRoutes />
                </div>
                <Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        Changing ©2018 Created by Changing
                    </Footer>
                </Layout>
            </Content>
        )
    }
}
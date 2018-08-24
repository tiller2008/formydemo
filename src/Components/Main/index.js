import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import Details from '../Details';
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
        Utils.ajax('/data.json', i => {
            let icons = JSON.parse(i).icons;
            this.setState({ icon: icons });
        });
    }

    handleSelectOrUnSelect(idx) {
        let icon = this.state.icon;
        icon[idx].selected = !this.state.icon[idx].selected;
        this.setState({ 'array': { ...icon, icon } })
    }

    _renderApp(i, idx) {
        const iconStyle = {
            height: '1em',
            verticalAlign: 'middle',
            fill: 'currentColor',
            overflow: 'hidden'
        }

        return (
            <li className={`${i.name}${i.selected ? '' : ' selected'}`} key={idx}>
                <svg className="iconapp" aria-hidden="true" style={iconStyle}>
                    <use xlinkHref={i.href}></use>
                </svg>
                <span className="icon-name" title={i.title}>{i.title}</span>
                <div className="icon-cover">
                    <span title="添加" className="cover-item anticon cover-item-line icon-star" onClick={this.handleSelectOrUnSelect.bind(this, idx)}></span>
                    <span title="查看" className="cover-item anticon cover-item-line icon-eye">
                        <Link to={`/${i.catalog}/${i.name.substr(7)}`} key={i.idx}></Link>
                    </span>
                </div>
            </li>
        )
    }

    render() {
        if (!this.state.menu) {
            return <div>loading...</div>
        }

        if (!this.state.icon) {
            return <div>loading...</div>;
        }

        // 通过类别来帅选显示应用
        const filter = this.props.match.url.substr(1);

        return (
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item >
                        <Link to='/'>首页</Link>
                    </Breadcrumb.Item>
                    {
                        this.state.menu.map((m, idx) => {
                            return (
                                '/' + m.name === this.props.match.url ?
                                    <Breadcrumb.Item key={idx}>{m.title}</Breadcrumb.Item> : null
                            )
                        })
                    }
                </Breadcrumb>
                <div className="main">
                    <ul className="icon-list">
                        {
                            this.state.icon.map((i, idx) => {
                                if (!filter)
                                    return this._renderApp(i, idx)
                                else
                                    if (filter === i.catalog)
                                        return this._renderApp(i, idx)
                                    else
                                        return null
                            })
                        }
                        <Link to='/Shopping/taobaotianmao'>taobaotianmao</Link>
                        <Switch>
                            <Route path='/:catalog/:App' component={Details}></Route>
                        </Switch>
                    </ul>
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
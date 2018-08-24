import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Utils from '../../Utils/utils';
const { Sider } = Layout;

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    static propTypes = {
        location: PropTypes.object.isRequired
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
        Utils.ajax('/menu.json', m => {
            let menu = JSON.parse(m).menu;
            this.setState({ menu: menu });
        });
    }

    render() {
        const { location } = this.props;
        if (!this.state.menu) {
            return <div>loading...</div>;
        }

        return (
            <Sider
                breakpoint="md"
                onBreakpoint={(broken) => { console.log(broken); }}
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
            >
                <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                    {this.state.menu.map(m => {
                        return (
                            <Menu.Item key={`/${m.name}`}>
                                <Link to={`/${m.name}`} >
                                    <Icon type={m.type} />
                                    <span>{m.title}</span>
                                </Link>
                            </Menu.Item>
                        )
                    })}
                </Menu>
            </Sider>
        );
    }
}

export default withRouter(Slider);
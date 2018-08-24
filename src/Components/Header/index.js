import React, { Component } from 'react';
import { Badge } from 'antd';
import './index.less';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="nav">
                    <div className="logo">Logo</div>
                    <nav></nav>
                    <div className="quick-menu">
                        <ul>
                            <li>
                                <a className="signin">
                                    <i className="iconfont anticon anticon-user"></i>
                                </a>
                            </li>
                            <li>
                                <Badge className="icon-save" count={0} showZero>
                                    <i className="iconfont anticon anticon-save"></i>
                                </Badge>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}
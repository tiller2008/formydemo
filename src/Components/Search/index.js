import React, { Component } from 'react';
import { Icon, DatePicker } from 'antd';
import './index.less';

export default class Search extends Component {
    render() {
        return (
            <span>
                <DatePicker />
                <Icon type="search" key="search"/>
            </span>
        )
    }
}
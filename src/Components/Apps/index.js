import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Utils from '../../Utils/utils';
import './index.less';
// import Cover from './Cover';

export default class Apps extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.getData();
    }

    getData() {
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
                    <Link to={`/${i.catalog}/${i.name.substr(7)}`} key={i.idx}>
                        <span title="查看" className="cover-item anticon cover-item-line icon-eye"></span>
                    </Link>

                </div>
            </li>
        )
    }

    render() {
        if (!this.state.icon) {
            return <div>loading...</div>;
        }

        // 通过类别来帅选显示应用
        const filter = this.props.match.url.split('/').join('');

        return (
            <ul className="icon-list">
                {
                    this.state.icon.map((i, idx) => {
                        if (!filter || filter === i.catalog)
                            return this._renderApp(i, idx)
                        else
                            return null
                    })}
            </ul>
        )
    }
}
import React, { Component } from 'react';
// 废弃
export default class SpanBotton extends Component {
    constructor() {
        super();
    }

    handleToggle(e) {
        e.preventDefault();
        this.props.onToggle(this.props.style);
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={this.handleToggle.bind(this)}>
                {this.props.label}
            </span>
        );
    }
}
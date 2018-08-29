import React, { Component } from 'react';
import {Button} from 'antd';

import RichEditor from '../RichEditor';

class Details extends Component {
    render() {
        return (
            <div>{this.props.match.url}</div>
        )
    }
}

class MyEditor extends Component {
    render() {
        return (
            <div>
            <RichEditor />
            <Button type='primary'>保存</Button>
            </div>
        )
    }
}

export { Details, MyEditor };
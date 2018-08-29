import React, { Component } from 'react';

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
            </div>
        )
    }
}

export { Details, MyEditor };
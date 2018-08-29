import React, { Component } from 'react'

// 引入编辑器以及编辑器样式
import BraftEditor from 'braft-editor';
import { Button } from 'antd';
import './index.less'

export default class RichEditor extends Component {
    constructor() {
        super();
        this.state = {
            value: ''
        }
    }
    render() {
        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: '',
            placeholder: '请输入...',
            onChange: this.handleChange,
            onSave: this.handleSave,
            onRawChange: this.handleRawChange
        }

        return (
            <div className="editor">
                <BraftEditor {...editorProps} />
                <Button type='primary' onClick={this.handleSave}>保存</Button>
            </div>
        )
    }

    handleChange = (content) => {
        this.setState({ value: content })
    }

    handleRawChange = (rawContent) => {
        // console.log(rawContent)
    }

    handleSave = () => {
        console.log('save')
    }
}
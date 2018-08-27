import React, { Component } from 'react';
// import ReactQuill from 'react-quill';

// import 'react-quill/dist/quill.snow.css';
// import LzEditor from 'react-lz-editor';

// import BraftEditor from 'braft-editor';
// import 'braft-editor/dist/braft.css';

import RichEditor from '../RichEditor';

class Details extends Component {
    render() {
        return (
            <div>{this.props.match.url}</div>
        )
    }
}

class MyEditor extends Component {
    // react-quill
    // handleChange(value){
    //     this.setState({markdownContent: value})
    // }

    // react-lz-editor
    // receiveMarkdown(content) {
    //     console.log("received markdown content", content);        
    // }

    // braft-editor
    // handleChange(content){
    //     console.log(content)
    // }

    // draft-js
    // handleRawChange(rawContent){
    //     console.log(rawContent)
    // }

    render() {
        // braft-editor
        // const editorProps = {
        //     height: 500,
        //     contentFormat: 'html',
        //     initialContent: '<p>Hello World!</p>',
        //     OnChange: this.handleChange,
        //     OnRawChange: this.handleRawChange
        // }

        return (
            // react-quill
            // <ReactQuill
            //     value={this.state.markdownContent}
            //     onChange={this.handleChange.bind(this)}
            // />

            // react-lz-editor
            // <LzEditor
            //     active={false}
            //     importContent={this.state.markdownContent}
            //     cbReceiver={this.receiveMarkdown.bind(this)}
            //     image={false}
            //     video={false}
            //     audio={false}
            //     convertFormat="markdown"
            // />

            // braft-editor
            // <BraftEditor {...editorProps} />

            // draft-js
            <RichEditor />
        )
    }
}

export { Details, MyEditor };
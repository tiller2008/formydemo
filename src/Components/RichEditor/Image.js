import React, { Component } from 'react';

export default class Image extends Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        const { node } = this.props
        // console.log(this.props.node.data.get('file'));
        const { data } = node
        const file = data.get('file')
        this.load(file)
    }

    load(file) {
        const reader = new FileReader()
        reader.addEventListener('load', () => this.setState({ src: reader.result }))
        reader.readAsDataURL(file)
    }

    render() {
        const { attributes } = this.props
        const { src } = this.state
        // console.log(src)
        return src
            ? <img {...attributes} src={src} alt=''/>
            : <span>Loading...</span>
    }

}
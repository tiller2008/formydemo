import React, { Component } from 'react';
import Utils from '../../Utils/utils';
import './index.less';
// import Cover from './Cover';
// 废弃
export default class App extends Component {
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

    render() {
        if (!this.state.icon) {
            return <div>loading...</div>;
        }

        // 通过类别来帅选显示应用
        const filter = this.props.match.url.substr(1);

        // if (!filter) {
        //     return (
        //         this.state.icon.map((i, idx) => {
        //             return (
        //                 this._renderApp(i, idx)
        //             )
        //         })
        //     )
        // }

        // return (
        //     this.state.icon.map((i, idx) => {
        //         if (filter === i.catalog) {
        //             return (
        //                 this._renderApp(i,idx)
        //             )
        //         }
        //         else {
        //             return null
        //         }
        //     })
        // )
        
        return(
        this.state.icon.map((i, idx) => {
            if (!filter)
                return this._renderApp(i, idx)
            else
                if (filter === i.catalog)
                    return this._renderApp(i, idx)
                else
                    return null
        }))
    }
}
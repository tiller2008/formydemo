import React, { Component } from 'react';
import './index.less';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="foot-left">
                    <span className="foot-logo">Logo</span>
                    <div className="foot-content">
                        Changing倾力打造的一站式变更手机号码/搬家地址/Email等在各应用大平台的变更指南平台。
                        <br/>
                        用户可以将所涉及的应用平台收藏下来，最终统一查看。
                        <br/>
                        同时也欢迎广大网友，多多提提意见，共同完善，从而使更多的人收益。
                    </div>
                    <div className="foot-copy-right">
                        &copy;Powered by Changing. 法律声明
                        <br/>
                        商业媒体及纸媒请先联系：xxx@xxx.com
                    </div>
                </div>
                <div className="foot-right">
                    <div className="share-logos"></div>
                </div>
            </div>
        );
    }
}
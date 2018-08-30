import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes/Routes';

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();

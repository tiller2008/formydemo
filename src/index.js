import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
// import Slider from './Components/Slider';
// import Footer from './Components/Footer';
// import Header from './Components/Header';
// import Main from './Components/Main';
// import MainLayout from './Components/Layout';
import registerServiceWorker from './registerServiceWorker';
import MainLayout from './Components/Layout';

class Index extends Component {
    render() {
        return (
            <BrowserRouter>
                <MainLayout/>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();

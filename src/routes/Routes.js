import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../Components/Layout';
import Login from '../Components/Login';
import Register from '../Components/Register';

export default class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Layout} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route path='/:catalog' component={Layout} />
            </Switch>
        );
    }
}
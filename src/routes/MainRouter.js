import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../Components/Main';

export default class MainRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Main} />
                <Route path='/:catalog' component={Main} />
            </Switch>
        );
    }
}
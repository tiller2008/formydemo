import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Details, MyEditor } from '../Components/Details';
import Apps from '../Components/Apps';

export default class AppRoutes extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Apps}></Route>
                <Route exact path='/:catalog' component={Apps}></Route>
                <Route exact path='/:catalog/:App' component={Details}></Route>
                <Route path='/:catalog/:App/_edit' component={MyEditor}></Route>
            </Switch>
        );
    }
}
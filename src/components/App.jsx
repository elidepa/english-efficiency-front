import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './AuthRoute.jsx';

import LoginForm from './LoginForm.jsx';
import Dashboard from './Dashboard.jsx';
import Instructions from './Instructions.jsx';
import Intervention from './Intervention.jsx';
import RegistrationForm from './RegistrationForm.jsx';

export default class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <AuthRoute path='/dashboard' component={Dashboard} />
          <AuthRoute path='/instructions' component={Instructions} />
          <AuthRoute path='/session' component={Intervention} />
          <Route path='/login' component={LoginForm} />
          <Route path='/registration' component={RegistrationForm} />
          <Route path='/'>
            <Redirect to='/login' />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
};
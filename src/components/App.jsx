import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthRoute from './AuthRoute.jsx';
import Mousetrap from 'mousetrap';

import LoginForm from './LoginForm.jsx';
import Dashboard from './Dashboard.jsx';
import Instructions from './Instructions.jsx';
import Intervention from './Intervention.jsx';
import RegistrationForm from './RegistrationForm.jsx';
import Results from './Results.jsx';
import Overview from './Overview.jsx';

export default class App extends Component {
  componentDidMount() {
    Mousetrap.bind('alt+left', (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    })
  }

  render() {
    return(
      <BrowserRouter>
        <Switch>
          <AuthRoute path='/v2/dashboard' component={Dashboard} />
          <AuthRoute path='/v2/instructions' component={Instructions} />
          <AuthRoute path='/v2/session' component={Intervention} />
          <AuthRoute path='/v2/results' component={Results} />
          <Route path='/v2/login' component={LoginForm} />
          <Route path='/v2/registration' component={RegistrationForm} />
          <Route path='/v2/overview' component={Overview} />
          <Route path='/'>
            <Redirect to='/v2/login' />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
};
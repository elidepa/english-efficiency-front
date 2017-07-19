import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends Component {

  render() {
    const { component, isAuthenticated, ...rest } = this.props;
    if (isAuthenticated) {
      return <Route {...rest} component={component} />
    }

    return <Redirect to='/login' />;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(AuthRoute);

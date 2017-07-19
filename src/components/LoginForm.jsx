import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

// UI Components and styles
import { Container, Button, Form, Header, Segment } from 'semantic-ui-react';
import '../../styles/margins.scss'

import { userAuthenticate } from '../actions/user_actions';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      loginFormLoading: false,
      email: '',
      redirect: ''
    }

    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    this.onRegisterButtonClick = this.onRegisterButtonClick.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
  }

  onLoginButtonClick(event) {
    event.preventDefault();
    this.setState({ loginFormLoading: true });
    this.props.userAuthenticate({ email: this.state.email });
  }

  onRegisterButtonClick(event) {
    event.preventDefault();
    this.setState({ redirect: '/v2/registration' });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/v2/dashboard' />;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const errorSegment = this.props.loginError ? <Segment color='red'>{this.props.loginError}</Segment> : null

    return (
      <div className='margin-top-50'>
        <Container>
          <Header as='h1'>
            Welcome!
          </Header>
          <Header as='h3'>
            Please enter your email address to access the course.
          </Header>
          If this is your first time here, please click 'Register' to create a new user.
          {errorSegment}
          <div className='margin-top-25'>
            <Form loading={this.props.isFetching}>
              <Form.Field>
                <label>Email address</label>
                <input placeholder='Email' value={this.state.email} onChange={this.onEmailChange} />
              </Form.Field>
              <Button onClick={this.onLoginButtonClick} primary>
                Login
              </Button>
              <Button onClick={this.onRegisterButtonClick} secondary>
                Register
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.auth.isAuthenticated,
    isFetching: state.user.auth.isFetching,
    loginError: state.user.auth.error
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({userAuthenticate}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

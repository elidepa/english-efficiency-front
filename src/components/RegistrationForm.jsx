import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userRegister } from '../actions/user_actions';

import { Container, Form, Header, Button, Segment } from 'semantic-ui-react';

class RegistrationForm extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      emailConfirmation: '',
      group: '1',
      error: '',
      partTimer: 'full'
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEmploymentStatusChange = this.onEmploymentStatusChange.bind(this);
  }

  onInputChange(event) {
    const { value, id } = event.target;
    const newState = this.state;
    newState[id] = value;
    this.setState(newState);
  }

  onGroupChange(event) {
    const { value } = event.target;
    this.setState({
      group: value
    });
  }

  onEmploymentStatusChange(event) {
    const { value } = event.target;
    this.setState({
      partTimer: value
    });
  }

  onFormSubmit(event) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (this.state.email !== this.state.emailConfirmation) {
      this.setState({ error: 'Please verify that the email and the email confirmation are equal.' })
    } else if (this.state.email.search(emailRegex)) {
      this.setState({ error: 'Please verify that the email address you gave is valid.' })
    } else {
      const { email, group, partTimer } = this.state
      this.props.userRegister({
        partTimer,
        email,
        group
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      document.location = 'https://www.webropolsurveys.com/S/851C926E023CA957.par';
    }
  }

  render() {
    const stateErrorSegment = this.state.error ? <Segment color='red'>{this.state.error}</Segment> : null
    const propsErrorSegment = this.props.error ? <Segment color='red'>{this.props.error}</Segment> : null

    return(
      <Container>
        <div className='margin-top-50'>
          <Header as='h1'>
            Registration
          </Header>
          <div>
            {stateErrorSegment}
          </div>
          <div className='margin-top-25'>
            {propsErrorSegment}
          </div>
          <div className='margin-top-25'>
            <Form loading={this.props.isPosting} onSubmit={this.onFormSubmit}>
              <Form.Field>
                <label>Email address</label>
                <input id='email' placeholder='Please write your email address' onChange={this.onInputChange} />
              </Form.Field>
              <Form.Field>
                <label>Confirm email address</label>
                <input id='emailConfirmation' placeholder='Please confirm your email address' onChange={this.onInputChange} />
              </Form.Field>
              <Form.Field>
                <label>Group</label>
                <select value={this.state.group} onChange={this.onGroupChange}>
                  <option value='1'>1</option>
                  <option value='test'>Test user</option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>What is your employment status?</label>
                <select value={this.state.partTimer} onChange={this.onEmploymentStatusChange}>
                  <option value='true'>Part-time</option>
                  <option value='false'>Full-time</option>
                </select>
              </Form.Field>
              <Button>
                Register
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ userRegister }, dispatch);
}

const mapStateToProps = state => {
  const { isPosting, error, success } = state.user.registration;
  return {
    isPosting,
    error,
    success
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
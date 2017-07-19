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
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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

  onFormSubmit(event) {
    const { email, group } = this.state
    this.props.userRegister({
      email,
      group
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      document.location = 'https://www.webropolsurveys.com/S/7014BD072A120748.par';
    }
  }

  render() {
    return(
      <Container>
        <div className='margin-top-50'>
          <Header as='h1'>
            Registration
          </Header>
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
            <Button>
              Register
            </Button>
          </Form>
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
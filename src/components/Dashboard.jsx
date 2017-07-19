import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { resetSession, fetchSession } from '../actions/session_actions';
import { userLogout } from '../actions/user_actions';

import { Container, Header, Segment, Button } from 'semantic-ui-react';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      redirect: undefined
    }

    this.newSessionButtonOnClick = this.newSessionButtonOnClick.bind(this);
    this.resultsButtonOnClick = this.resultsButtonOnClick.bind(this);
    this.logoutButtonOnClick = this.logoutButtonOnClick.bind(this);
  }

  componentDidMount() {
    this.props.resetSession();
  }

  newSessionButtonOnClick() {
    this.props.fetchSession();
    this.setState({ redirect: '/instructions' });
  }

  resultsButtonOnClick() {
    this.setState({ redirect: '/results' });
  }

  logoutButtonOnClick() {
    this.props.userLogout();
    this.setState({ redirect: '/login' })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return(
      <div className='margin-top-50'>
        <Container>
          <div>
            <Button onClick={this.logoutButtonOnClick} floated='right'>Logout</Button>
          </div>
          <div>
            <Header as='h1'>
              Welcome back!
            </Header>
            <Segment secondary>
              Participation in this course will improve your typing skills. Please perform the exercises diligently,
              and your typing performance will increase and you will make less typing errors. You will be able to
              focus on what happens on the screen instead of worrying where your fingers are on the keyboard.
            </Segment>
            <Header as='h3'>
              Please select below whether you want to start a new session or view your previous results.
            </Header>
          </div>
          <div className='margin-top-25'>
            <Button onClick={this.newSessionButtonOnClick} primary>New session</Button>
            <Button onClick={this.resultsButtonOnClick} secondary>Results</Button>
          </div>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({userLogout, resetSession, fetchSession}, dispatch);
}

export default connect(null, mapDispatchToProps)(Dashboard);

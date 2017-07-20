import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { fetchSession } from '../actions/session_actions';
import { sendResults } from '../actions/result_actions';

import { Container, Dimmer, Loader, Header, Button } from 'semantic-ui-react';

class Instructions extends Component {
  constructor() {
    super();

    this.state = {
      redirect: undefined
    }

    this.startButtonOnClick = this.startButtonOnClick.bind(this);
  }

  startButtonOnClick() {
    this.setState({redirect: '/v2/session'})
  }

  render() {
    const {isFetching, sessionCompleted, instructions} = this.props;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    if (this.props.error) {
      return <Redirect to='/v2/dashboard' />
    }

    if (isFetching) {
      return(
        <Container>
          <Dimmer active inverted>
            <Loader size='huge' inverted inline='centered'>Loading</Loader>
          </Dimmer>
        </Container>
      )
    } else if (sessionCompleted) {
      this.props.sendResults(this.props.results);
      return <Redirect to='/v2/results' />;
    }

    const instructionsList = instructions ? instructions.map((instruction, i) => {
    return (
      <div key={i}>
        <p>{instruction.text}</p>
        {instruction.img ? <img src={instruction.img} width='700' /> : null}
      </div>
    );
    }) : null;

    return(
      <div className='margin-top-50'>
        <Container>
          <Header as='h1'>
            Instructions
          </Header>
          {instructionsList}
          <div className='margin-top-25'>
            <Button onClick={this.startButtonOnClick}>Start</Button>
          </div>
          <div className='margin-top-50'></div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { currentIntervention, sessionCompleted } = state.session.status;
  const currentInterventionData = state.session.config.interventions[currentIntervention];
  const instructions = currentInterventionData ? currentInterventionData.instructions : undefined;
  return {
    isFetching: state.session.config.isFetching,
    error: state.session.config.error,
    results: sessionCompleted ? state.session.results : null,
    sessionCompleted,
    instructions
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSession, sendResults }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);

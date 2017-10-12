import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { fetchSession } from '../actions/session_actions';
import { sendResults, fetchResults } from '../actions/result_actions';

import { Container, Dimmer, Loader, Header, Button, Segment } from 'semantic-ui-react';

class Instructions extends Component {
  constructor() {
    super();

    this.state = {
      redirect: undefined
    }

    this.startButtonOnClick = this.startButtonOnClick.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleBackspace);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleBackspace);
  }

  handleBackspace(event) {
    if (event.key === 'Backspace' && event.target.tagName.toUpperCase() === 'BODY') {
      event.preventDefault();
    }
  }

  startButtonOnClick() {
    this.setState({redirect: '/v2/session'})
  }

  render() {
    const {isFetching, isSending, sessionCompleted, instructions} = this.props;

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    if (this.props.error) {
      return <Redirect to='/v2/dashboard' />
    }

    if (isFetching || isSending) {
      return(
        <Container>
          <Dimmer active inverted>
            <Loader size='huge' inverted inline='centered'>Loading</Loader>
          </Dimmer>
        </Container>
      )
    } else if (sessionCompleted && this.props.lastSession && !isSending) {
      this.props.sendResults(this.props.results);
      document.location = 'https://www.webropolsurveys.com/S/C03AF1A4C18C32E1.par';
    } else if (sessionCompleted && !this.props.lastSession) {
      this.props.sendResults(this.props.results);
      return <Redirect to='/v2/results' />;
    }

    const instructionsList = instructions ? instructions.map((instruction, i) => {
    return (
      <div key={i}>
        {instruction.explanation ? <div style={{marginBottom: '25px'}}><Segment secondary>{instruction.explanation}</Segment></div> : null}
        {instruction.text ? <p>{instruction.text}</p> : null}
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
          <div className='margin-top-25' style={{ paddingBottom: '100px'}}>
            <Button onClick={this.startButtonOnClick}>Start</Button>
          </div>
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
    isSending: state.session.config.isSending,
    error: state.session.config.error,
    results: sessionCompleted ? state.session.results : null,
    lastSession: state.session.config.lastSession,
    sessionCompleted,
    instructions
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchSession, sendResults, fetchResults }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Instructions);

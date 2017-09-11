import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { nextIntervention } from '../actions/session_actions';

import ShiftOfAttention from './interventions/ShiftOfAttention.jsx';
import MotorControl from './interventions/MotorControl.jsx';
import VisualSearch from './interventions/VisualSearch.jsx';
import Typingtest from './interventions/Typingtest.jsx';

import { Container } from 'semantic-ui-react';

class Intervention extends Component {
  constructor() {
    super();

    this.state = {
      redirect: undefined
    };

    this.handleBackspace = this.handleBackspace.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleBackspace);
    if (this.props.intervention && this.props.intervention.type !== 'T') {
      setTimeout(() => {
        this.props.nextIntervention();
        this.setState({redirect: '/v2/instructions' });
      }, this.props.intervention.duration);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleBackspace);
  }

  handleBackspace(event) {
    if (event.key === 'Backspace' && event.target.tagName.toUpperCase() === 'BODY') {
      event.preventDefault();
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return(
      <div>
        {(type => {
          switch (type) {
          case 'A':
            return <ShiftOfAttention />;
          case 'M':
            return <MotorControl />;
          case 'V':
           return <VisualSearch />;
          case 'T':
            return <Typingtest
              endTest={() => {
                this.props.nextIntervention();
                this.setState({redirect: '/v2/instructions' });
              }}   
            />
          }
        })(this.props.intervention ? this.props.intervention.type : null)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentIntervention } = state.session.status;
  const currentInterventionData = state.session.config.interventions[currentIntervention];
  return {
    intervention: currentInterventionData,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ nextIntervention }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Intervention);

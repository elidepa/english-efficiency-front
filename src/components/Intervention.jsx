import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { nextIntervention } from '../actions/session_actions';

import ShiftOfAttention from './interventions/ShiftOfAttention.jsx';
import MotorControl from './interventions/MotorControl.jsx';
import VisualSearch from './interventions/VisualSearch.jsx';

import { Container } from 'semantic-ui-react';

class Intervention extends Component {
  constructor() {
    super();

    this.state = {
      redirect: undefined
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.nextIntervention();
      this.setState({redirect: '/v2/instructions' });
    }, this.props.intervention.duration);
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

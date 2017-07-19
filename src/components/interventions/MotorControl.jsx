import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushKeystrokes, pushSection, nextSection } from '../../actions/session_actions';

import { Container } from 'semantic-ui-react';

import MCPracticePhase from './MCPracticePhase.jsx';
import MCPseudoWordPhase from './MCPseudoWordPhase.jsx';
import Timer from './Timer.jsx';

class MotorControl extends Component {
  constructor() {
    super();

    this.state = {
      practicePhase: true,
      practiceKeystrokes: []
    }
  }

  render() {
    return(
      <Container>
        <Timer />
        <div className='margin-top-250'>
          {
            this.state.practicePhase ? 
            <MCPracticePhase 
              bigram={this.props.bigram}
              sectionEnd={ keystrokes => {
                this.setState({
                  practicePhase: false,
                  practiceKeystrokes: keystrokes
                });
              }}
            /> : 
            <MCPseudoWordPhase 
              pseudoword={this.props.pseudoword}
              sectionEnd={ sectionData => {
                const { keystrokes, userInputs } = sectionData;
                this.props.pushKeystrokes({
                  practiceKeystrokes: this.state.practiceKeystrokes,
                  pseudoKeystrokes: keystrokes
                });
                this.props.pushSection({
                  bigram: this.props.bigram,
                  pseudoword: this.props.pseudoword,
                  userInputs
                });
                this.props.nextSection();
                this.setState({
                  practicePhase: true,
                  practiceKeystrokes: []
                });
              }}
            />
          }
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { currentIntervention, currentSection } = state.session.status;
  return {
    bigram: state.session.config.interventions[currentIntervention].interventionData[currentSection].bigram,
    pseudoword: state.session.config.interventions[currentIntervention].interventionData[currentSection].pseudoword
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ pushKeystrokes, pushSection, nextSection }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MotorControl);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushSection, nextSection, pushKeystrokes } from '../../actions/session_actions';

import { Container, Form } from 'semantic-ui-react';

import ExcerciseInput from './ExcerciseInput.jsx';

class Typingtest extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.sentence && nextProps.currentSection > 0) {
      this.props.endTest()
    }
  }

  render() {
    return(
      <Container>
        <div className='margin-top-250'>
          <div>{this.props.currentSection + 1}/35</div>
          <Form>
            <Form.Field>
              <input 
                disabled 
                value={this.props.sentence ? this.props.sentence : ''} 
                style={{ 
                  color: '#000000', 
                  opacity: '1', 
                  fontFamily: 'monospace' 
                }}
              />
            </Form.Field>
            <Form.Field>
              <ExcerciseInput 
                pushSection={ userInput => {
                  this.props.pushSection({ sentence: this.props.sentence, userInput });
                }}
                pushKeystrokes={ keystrokes =>{
                  this.props.pushKeystrokes(keystrokes);
                }}
                nextSection={ () => {
                  this.props.nextSection();
                }}
                currentSection={this.props.currentSection}
              />
            </Form.Field>
          </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { currentIntervention, currentSection } = state.session.status
  return {
    sentence: state.session.config.interventions[currentIntervention].interventionData.sentences[currentSection],
    currentSection
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({pushSection, nextSection, pushKeystrokes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Typingtest);
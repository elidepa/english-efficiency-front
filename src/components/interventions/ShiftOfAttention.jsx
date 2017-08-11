import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { pushSection, pushDistractions, nextSection, pushKeystrokes } from '../../actions/session_actions';

import { Container, Form } from 'semantic-ui-react';

import ExcerciseInput from './ExcerciseInput.jsx';
import Distraction from './Distraction.jsx';
import Timer from './Timer.jsx';

class ShiftOfAttention extends Component {
  constructor() {
    super();

    this.state = {
      distractions: [],
      currentDistraction: null,
      distractionTimer: {},
      punishmentTimer: {},
      punish: false,
      distractionVisible: false
    }

    this.setDistractionTimeout = this.setDistractionTimeout.bind(this);
    this.showDistraction = this.showDistraction.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.resetDistraction = this.resetDistraction.bind(this);
  }

  setDistractionTimeout() {
    console.log('new timeout');
    this.setState({
      distractionTimer: setTimeout(() => {
        this.showDistraction();
      }, Math.random() * 4000 + 6000)
      // }, 3000)
    });
  }

  showDistraction() {
    this.setState({
      currentDistraction: {
        distractionShown: Math.floor(performance.now())
      },
      // Set the punishment timer to show punishment in 2 secs if no reaction
      punishmentTimer: setTimeout(() => {
        this.setState({ punish: true })
      }, 2000)
    });
    this.setState({ distractionVisible: true });
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.onKeyDown);
    clearTimeout(this.state.distractionTimer);
  }

  onKeyDown(event) {
    if (this.state.distractionVisible && event.key === 'Control') {

      // Cancel the punishment
      if (this.state.punishmentTimer) {
        clearTimeout(this.state.punishmentTimer);
      }
      
      const { distractions, currentDistraction } = this.state;
      distractions.push({
        reaction: Math.floor(performance.now()),
        ...currentDistraction
      })
      this.setState({
        currentDistraction: {},
        distractionVisible: false,
        distractions
      });

      // If punishment is being shown, wait for 1 sec before clearing it, the set new distraction timeout.
      // Else set new distraction timeout without waiting.
      if (this.state.punish) {
        setTimeout(() => {
          this.setState({punish: false});
          this.setDistractionTimeout();
        }, 1000);
      } else {
        this.setDistractionTimeout();
      }

    }
  }

  resetDistraction() {
    if (this.state.punishmentTimer) {
      clearTimeout(this.state.punishmentTimer);
    }
    clearTimeout(this.state.distractionTimer);
    this.setState({
      distractionVisible: false,
      distractionTimer: {},
      currentDistraction: null,
      punish: false,
      punishmentTimer: null
    });
  }

  render() {
    return(
      <Container>
        <Timer />
        <div style={{ backgroundColor: this.state.punish ? 'black' : 'white' }}>
          <div style={{ visibility: this.state.punish ? 'hidden' : 'visible' }} className='margin-top-250'>
            <div style={{ position: 'relative', left: '45%'}}>
              <Distraction visible={this.state.distractionVisible && !this.state.punish} />
            </div>
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
                    this.props.pushDistractions(this.state.distractions);
                    this.props.pushSection({ sentence: this.props.sentence, userInput });
                    this.resetDistraction();
                    this.setState({
                      distractions: []
                    })
                  }}
                  startSection={ () => {
                    this.setDistractionTimeout();
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
  return bindActionCreators({pushSection, pushDistractions, nextSection, pushKeystrokes}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftOfAttention);
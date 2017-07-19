import React, { Component } from 'react';
import _ from 'lodash';

import { Form } from 'semantic-ui-react';

import ExcerciseInput from './ExcerciseInput.jsx';

class MCPseudoWordPhase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repetitions: 0,
      keystrokes: [],
      userInputs: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.repetitions >= 5) {
      this.props.sectionEnd({
        keystrokes: nextState.keystrokes,
        userInputs: nextState.userInputs
      });
    }
  }

  render() {
    const { repetitions } = this.state;
    return(
      <div>
        <div>
          Repetitions: {repetitions}
        </div>
        <Form>
          <Form.Field>
            <input 
              disabled 
              value={this.props.pseudoword ? this.props.pseudoword : ''} 
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
                const { userInputs, repetitions } = this.state;
                this.setState({
                  repetitions: repetitions + 1,
                  userInputs: [...userInputs, userInput]
                });
              }}
              pushKeystrokes={ newKeystrokes => {
                _.forEach(newKeystrokes, el => el.repetition = this.state.repetitions);
                let { keystrokes } = this.state;
                // keystrokes.push(newKeystrokes);
                keystrokes = [
                  ...keystrokes,
                  ...newKeystrokes
                ]
                this.setState({
                  keystrokes
                });
              }}
              currentSection={repetitions}
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default MCPseudoWordPhase;
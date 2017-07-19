import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';

class MCPracticePhase extends Component {
  constructor(props) {
    super(props);

    console.log(this.props)

    const { bigram } = props;

    this.state = {
      keydowns: [],
      keystrokes: [],
      leftBtnPressed: false,
      rightBtnPressed: false,
      otherKeyPressed: false,
      leftBtn: bigram.slice(0,1),
      rightBtn: bigram.slice(1,2),
      leftErr: false,
      rightErr: false,
      errorMsg: '',
      repetitions: 0
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyDown(event) {
    // Save keydown event
    const { keydowns } = this.state;
    if (!_.find(keydowns, keydown => keydown.key === event.key)) {
      keydowns.push({
        time: Math.floor(performance.now()),
        key: event.key,
        repetition: this.state.repetitions
      });
    }
    this.setState({ keydowns });

    const { key } = event;
    const { leftErr, rightErr, leftBtn, rightBtn, leftBtnPressed, rightBtnPressed } = this.state;

    if (!((key === leftBtn && leftBtnPressed) || (key === rightBtn && rightBtnPressed))) {
      if (key !== leftBtn && key !== rightBtn) {
        // Completely wrong key
        this.setState({ 
          errorMsg: 'Please press only the keys shown',
          otherKeyPressed: true
        });
      } else if (!leftBtnPressed && key === rightBtn) {
        // Left needs to be pressed first
        this.setState({
          rightBtnPressed: true,
          rightErr: true,
          errorMsg: 'Please first press the key on the left.'
        });
      } else if (!rightBtnPressed && key === leftBtn) {
        // Correct step 1
        this.setState({
          rightErr: false,
          leftErr: false,
          leftBtnPressed: true,
          errorMsg: ''
        });
      } else if (leftBtnPressed && key === rightBtn) {
        // Correct step 2
        if (!leftErr) {
          this.setState({
            rightBtnPressed: true,
            errorMsg: ''
          });
        } else {
          this.setState({
            rightErr: true,
            rightBtnPressed: true,
            errorMsg: 'Please release both keys and start from the beginning.'
          });
        }
      } else if (rightBtnPressed && key === leftBtn) {
        // Left pressed when right is already pressed
        this.setState({
          leftBtnPressed: true,
          leftErr: true,
          errorMsg: 'Please release the right key first before pressing the left key again.'
        });
      }
    }
  }

  handleKeyUp(event) {
    const { key } = event;
    const { rightErr, leftErr, leftBtn, rightBtn, leftBtnPressed, rightBtnPressed } = this.state;
    let correct = false;

    let stateChange = {};

    if (rightBtnPressed && key === leftBtn) {
      // Correct step 3
      correct = true;
      stateChange = {
        leftBtnPressed: false,
        leftErr: false,
        errorMsg: ''
      };
    } else if (!leftBtnPressed && key === rightBtn) {
      // Correct step 4
      let { repetitions } = this.state;
      if (!rightErr && !leftErr) {
        correct = true;
        repetitions = this.state.repetitions + 1;
      }
      stateChange = {
        rightBtnPressed: false,
        errorMsg: '',
        rightErr: false,
        repetitions
      };
    } else if (leftBtnPressed && key === rightBtn) {
      // Right is released before left
      stateChange = {
        rightBtnPressed: false,
        leftErr: true,
        rightErr: false,
        errorMsg: 'Please release the left key before releasing the right key.'
      };
    } else if (!rightBtnPressed && key === leftBtn) {
      // Left is released before pressing right
      stateChange = {
        leftBtnPressed: false,
        leftErr: false,
      };
    } else if (key === rightBtn) {
      stateChange = {
        rightErr: false,
        rightBtnPressed: false
      };
    } else if (key === leftBtn) {
      stateChange = {
        leftErr: false,
        leftBtnPressed: false
      };
    } else {
      stateChange = {
        otherKeyPressed: false
      };
    }

    // Resolve keyup and save it
    let { keydowns, keystrokes } = this.state;
    const resolvedIndex = _.findIndex(keydowns, (keydown) => {
      return keydown.key === event.key;
    });
    if (resolvedIndex >= 0) {
      const keydown = keydowns[resolvedIndex];
      keydowns.splice(resolvedIndex, 1);
      this.setState({
        keydowns,
        keystrokes: [
          ...keystrokes,
          { 
            key: event.key,
            keydown: keydown.time,
            keyup: Math.floor(performance.now()),
            repetition: keydown.repetition,
            correct
          }
        ] 
      });
    }

    this.setState(stateChange);
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
    document.body.removeEventListener('keyup', this.handleKeyUp);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.repetitions >= 5) {
      this.props.sectionEnd(nextState.keystrokes);
    }
  }

  render() {
    const btnStyle = {
      height: '60px',
      width: '60px',
      display: 'inline-block'
    }
    const leftBtnStyle = {
      marginLeft: '40%',
      border: (this.state.leftErr ? 'solid red 3px' : (this.state.leftBtnPressed ? 'solid green 3px' : 'solid black 3px')),
      backgroundColor: (this.state.leftErr ? 'lightpink' : (this.state.leftBtnPressed ? 'lightgreen' : 'white')),
      ...btnStyle
    }
    const rightBtnStyle = {
      marginLeft: '10%',
      border: (this.state.rightErr ? 'solid red 3px' : (this.state.rightBtnPressed ? 'solid green 3px' : 'solid black 3px')),
      backgroundColor: (this.state.rightErr ? 'lightpink' : (this.state.rightBtnPressed ? 'lightgreen' : 'white')),
      ...btnStyle
    }

    const btnContentStyle = {
      paddingLeft: '3px',
      fontWeight: 'bold',
      fontSize: '18px',
      userSelect: 'none'
    }

    const { repetitions, errorMsg, leftBtnPressed, rightBtnPressed, otherKeyPressed, leftBtn, rightBtn} = this.state;

    return(
      <div>
        <div>
          Repetitions: {repetitions}
        </div>
        <div style={{ visibility: (errorMsg && (leftBtnPressed || rightBtnPressed || otherKeyPressed)) ? 'visible' : 'hidden' }}>
          <Segment color='red'>
            {errorMsg ? errorMsg : 'Error'}
          </Segment>
        </div>
        <div className='margin-top-25'>
          <div style={leftBtnStyle}>
            <div style={btnContentStyle}>
              {leftBtn}
            </div>
          </div>
          <div style={rightBtnStyle}>
            <div style={btnContentStyle}>
              {rightBtn}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MCPracticePhase;
import React, { Component } from 'react';
import _ from 'lodash';

class ExcerciseInput extends Component {
  constructor() {
    super();

    this.state = {
      keystrokes: [],
      keydowns: [],
      value: '',
      sectionInProgress: false
    }

    this.inputOnChange = this.inputOnChange.bind(this);
    this.inputOnKeyDown = this.inputOnKeyDown.bind(this);
    this.inputOnKeyUp = this.inputOnKeyUp.bind(this);
  }

  inputOnChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  inputOnKeyDown(event) {
    let { keydowns, keystrokes, value } = this.state;
    // If enter is pressed, push keystrokes and section to results, increment section count
    if (event.key === 'Enter' && !_.isEmpty(this.state.value)) {
      if (this.props.pushKeystrokes) {
        this.props.pushKeystrokes(keystrokes);
      }
      if (this.props.pushSection) {
        this.props.pushSection(value);
      }
      if (this.props.nextSection) {
        this.props.nextSection();
      }
    } else {
      if (!this.state.sectionInProgress && this.props.startSection) {
        this.setState({ sectionInProgress: true })
        this.props.startSection();
      }
      // Push keydown ONLY if there are no other unresolved keydowns from the same key
      if (!_.find(keydowns, keydown => keydown.key === event.key)) {
        keydowns.push({
          time: Math.floor(performance.now()),
          key: event.key
        });
      }
      this.setState({ keydowns });
    }
  }

  inputOnKeyUp(event) {
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
            keyup: Math.floor(performance.now())
          }
        ] 
      });

      // console.log({
      //   key: event.key,
      //   keydown: keydown.time,
      //   keyup: Math.floor(performance.now()),
      //   pressed: Math.floor(performance.now()) - keydown.time
      // })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentSection !== nextProps.currentSection) {
      this.setState({
        value: '',
        keydowns: [],
        keystrokes: [],
        sectionInProgress: false
      });
    }
  }

  componentDidMount() {
    this.input.focus();
  }

  componentDidUpdate() {
    this.input.focus();
  }

  render() {
    return(
      <input 
        ref={input => this.input = input}
        value={this.state.value} 
        onChange={this.inputOnChange}
        onKeyDown={this.inputOnKeyDown}
        onKeyUp={this.inputOnKeyUp}
        style={{
          fontFamily: 'monospace'
        }}
      />
    )
  }
}

export default ExcerciseInput;
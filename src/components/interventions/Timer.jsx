import React, { Component } from 'react';

export default class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timerInterval: {},
      timer: 0
    }
    
    this.formatTimer = this.formatTimer.bind(this);
  }

  componentDidMount() {
    this.setState({ 
      timerInterval: setInterval(() => {
        const timer = this.state.timer + 1;
        this.setState({timer});
      }, 1000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerInterval);
  }

  formatTimer() {
    const mins = Math.floor(this.state.timer / 60);
    const secs = Math.floor(this.state.timer % 60);
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  render() {
    return(
      <div>
        {this.formatTimer()}
      </div>
    )
  }
}
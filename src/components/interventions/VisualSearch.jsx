import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushSection, nextSection } from '../../actions/session_actions'

import Rx from 'rxjs/Rx';

import { Container } from 'semantic-ui-react';
import Timer from './Timer.jsx';
import Keyboard from './Keyboard.jsx';

import { monogramFreqs, monograms, bigramFreqs } from '../../config/visual_search';

class VisualSearch extends Component {
  constructor() {
    super();

    this.state = {
      cuePosition: null,
      cue: null,
      cueOnKbd: null,
      mouseMoves: [],
      mouseMoveSubscriber: null,
      cuePhase: true,
      cueClick: null,
      cueShown: null
    }

    this.selectBigram = this.selectBigram.bind(this);
  }

  componentDidMount() {
    this.selectBigram();
    const $mouseMoves = Rx.Observable.fromEvent(document, 'mousemove')
      .throttleTime(20)
      .filter(() => {return !this.state.cuePhase})
    this.setState({
      mouseMoveSubscriber: $mouseMoves.subscribe((event) => {
        const { mouseMoves } = this.state;
        this.setState({
          mouseMoves: [
            ...mouseMoves,
            {
              x: event.screenX,
              y: event.screenY,
              time: Math.floor(performance.now())
            }
          ]
        });
      })
    });
  }

  componentWillUnmount() {
    this.state.mouseMoveSubscriber.complete();
  }

  weightedRand(spec) {
    let i, sum=0, r=Math.random();
    for (i in spec) {
      sum += spec[i];
      if (r <= sum) return i;
    }
  }

  selectBigram() {
    const monogramIndex = this.weightedRand(monogramFreqs);
    const cue = monograms[monogramIndex];
    const cuePosition = monograms[this.weightedRand(bigramFreqs[monogramIndex])];
    const cueOnKbd = Math.random() < 0.5;
    this.setState({
      cuePosition: cueOnKbd ? cuePosition : null,
      cueShown: Math.floor(performance.now()),
      cue,
      cueOnKbd
    });
  }

  render() {
    return(
      <div style={{ marginLeft: '200px'}}>
        <Timer />
        <div className='margin-top-250'>
          {
            this.state.cuePhase ?
              <Keyboard
                onClick={(click) => {
                  this.setState({
                    cueClick: click,
                    cuePhase: false
                  });
                }}
                cueOnKbd={this.state.cueOnKbd}
                cue={this.state.cue}
                cuePosition={this.state.cueOnKbd ? this.state.cuePosition : undefined}
                visible={false}
              /> :
              <Keyboard
                onClick={(click) => {
                  this.props.pushSection({
                    cuePosition: this.state.cueOnKbd ? this.state.cuePosition : 'top',
                    cue: this.state.cue,
                    bigram: this.state.cueOnKbd ? this.state.cuePosition + this.state.cue : null,
                    cueClick: this.state.cueClick,
                    kbdClick: click,
                    mouseMoves: this.state.mouseMoves,
                    cueShown: this.state.cueShown
                  });
                  this.props.nextSection();
                  this.selectBigram();
                  this.setState({
                    cuePhase: true,
                    cueClick: null,
                    mouseMoves: []
                  })
                }}
                visible={true}
              />
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ pushSection, nextSection }, dispatch);
}

export default connect(null, mapDispatchToProps)(VisualSearch);
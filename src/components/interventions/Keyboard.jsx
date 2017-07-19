import React, { Component } from 'react';
import KeyboardButton from './KeyboardButton.jsx';
import _ from 'lodash';

export default class Keyboard extends Component {
  constructor() {
    super();
  }

  mapKeyboardKeys(row, column, key) {
    return(
      key.key === 'empty' ? <div key={row + '-' + column} style={{ height: '60px', width: (key.size * 60) + 'px' }}></div> :
        <KeyboardButton
          border={key.border}
          content={this.props.cueOnKbd ? this.props.cue : key.key}
          style={ key.style ? key.style : null }
          size={key.size}
          key={row + '-' + column}
          visible={this.props.visible || (key.cueAllowed && key.key === this.props.cuePosition && this.props.cueOnKbd)}
          onClick={this.props.onClick}
        />
    );
  }

  render() {
    const rowOne = [
      { key: 'ESC', border: ['n','w','e','s'], size: 1 },
      { key: 'empty', size: 1 },
      { key: 'F1', border: ['n','w','s'], size: 1 },
      { key: 'F2', border: ['n','s'], size: 1 },
      { key: 'F3', border: ['n','s'], size: 1 },
      { key: 'F4', border: ['n','e','s'], size: 1 },
      { key: 'empty', size: 0.5 },
      { key: 'F5', border: ['n','w','s'], size: 1 },
      { key: 'F6', border: ['n','s'], size: 1 },
      { key: 'F7', border: ['n','s'], size: 1 },
      { key: 'F8', border: ['n','e','s'], size: 1 },
      { key: 'empty', size: 0.5 },
      { key: 'F9', border: ['n','w','s'], size: 1 },
      { key: 'F10', border: ['n','s'], size: 1 },
      { key: 'F11', border: ['n','s'], size: 1 },
      { key: 'F12', border: ['n','e','s'], size: 1 },
      { key: 'empty', size: 0.5 },
      { key: 'Prt Scr', border: ['n','w','s'], size: 1 },
      { key: 'Sc lock', border: ['n','s'], size: 1 },
      { key: 'Pause', border: ['n','e','s'], size: 1 },
    ];

    const rowTwo = [
      { key: '`', border: ['n','w'], size: 1, cueAllowed: true },
      { key: '1', border: ['n'], size: 1, cueAllowed: true },
      { key: '2', border: ['n'], size: 1, cueAllowed: true },
      { key: '3', border: ['n'], size: 1, cueAllowed: true },
      { key: '4', border: ['n'], size: 1, cueAllowed: true },
      { key: '5', border: ['n'], size: 1, cueAllowed: true },
      { key: '6', border: ['n'], size: 1, cueAllowed: true },
      { key: '7', border: ['n'], size: 1, cueAllowed: true },
      { key: '8', border: ['n'], size: 1, cueAllowed: true },
      { key: '9', border: ['n'], size: 1, cueAllowed: true },
      { key: '0', border: ['n'], size: 1, cueAllowed: true },
      { key: '-', border: ['n'], size: 1, cueAllowed: true },
      { key: '=', border: ['n'], size: 1, cueAllowed: true },
      { key: 'BKSP', border: ['n','e'], size: 2 },
      { key: 'empty', size: 0.5 },
      { key: 'Ins', border: ['n','w'], size: 1 },
      { key: 'Home', border: ['n'], size: 1 },
      { key: 'PgUp', border: ['n','e'], size: 1 },
      { key: 'empty', size: 0.5 },
      { key: 'Num Lock', border: ['n','w'], size: 1 },
      { key: '/', border: ['n'], size: 1 },
      { key: '*', border: ['n'], size: 1 },
      { key: '-', border: ['n','e'], size: 1 },
    ]

    const rowThree = [
      { key: 'TAB', border: ['w'], size: 1.5 },
      { key: 'Q', size: 1, cueAllowed: true },
      { key: 'W', size: 1, cueAllowed: true },
      { key: 'E', size: 1, cueAllowed: true },
      { key: 'R', size: 1, cueAllowed: true },
      { key: 'T', size: 1, cueAllowed: true },
      { key: 'Y', size: 1, cueAllowed: true },
      { key: 'U', size: 1, cueAllowed: true },
      { key: 'I', size: 1, cueAllowed: true },
      { key: 'O', size: 1, cueAllowed: true },
      { key: 'P', size: 1, cueAllowed: true },
      { key: '[', size: 1, cueAllowed: true },
      { key: ']', size: 1, cueAllowed: true },
      { key: 'Enter', border: ['e'], style: { borderBottom: 'none' }, size: 1.5 },
      { key: 'empty', size: 0.5 },
      { key: 'Del', border: ['s','w'], size: 1 },
      { key: 'End', border: ['s'], size: 1 },
      { key: 'PgDn', border: ['s','e'], size: 1 },
      { key: 'empty', size: 0.5 },
      { key: '7', border: ['w'], size: 1 },
      { key: '8', size: 1 },
      { key: '9', size: 1 },
      { key: '+', border: ['e'], size: 1, style: { borderBottom: 'none' } },
    ]

    const rowFour = [
      { key: 'CAPS', border: ['w'], size: 1.75 },
      { key: 'A', size: 1, cueAllowed: true },
      { key: 'S', size: 1, cueAllowed: true },
      { key: 'D', size: 1, cueAllowed: true },
      { key: 'F', size: 1, cueAllowed: true },
      { key: 'G', size: 1, cueAllowed: true },
      { key: 'H', size: 1, cueAllowed: true },
      { key: 'J', size: 1, cueAllowed: true },
      { key: 'K', size: 1, cueAllowed: true },
      { key: 'L', size: 1, cueAllowed: true },
      { key: ';', size: 1, cueAllowed: true },
      { key: "'", size: 1, cueAllowed: true },
      { key: '#', size: 1, cueAllowed: true },
      { key: ' ', border: [,'e'], size: 1.25, style: { borderTop: 'none' } },
      { key: 'empty', size: 4 },
      { key: '4', border: ['w'], size: 1 },
      { key: '5', size: 1 },
      { key: '6', size: 1 },
      { key: ' ', border: ['e'], size: 1, style: { borderTop: 'none' } },
    ]

    const rowFive = [
      { key: 'SHIFT', border: ['w'], size: 1.25 },
      { key: '\\', size: 1, cueAllowed: true },
      { key: 'Z', size: 1, cueAllowed: true },
      { key: 'X', size: 1, cueAllowed: true },
      { key: 'C', size: 1, cueAllowed: true },
      { key: 'V', size: 1, cueAllowed: true },
      { key: 'B', size: 1, cueAllowed: true },
      { key: 'N', size: 1, cueAllowed: true },
      { key: 'M', size: 1, cueAllowed: true },
      { key: ',', size: 1, cueAllowed: true },
      { key: '.', size: 1, cueAllowed: true },
      { key: '/', size: 1, cueAllowed: true },
      { key: 'SHIFT', border: ['e'], size: 2.75 },
      { key: 'empty', size: 1.5 },
      { key: '↑', border: ['n','w','e'], size: 1 },
      { key: 'empty', size: 1.5 },
      { key: '1', border: ['w'], size: 1 },
      { key: '2', size: 1 },
      { key: '3', size: 1 },
      { key: 'Ent', border: ['e'], size: 1, style: { borderBottom: 'none' } }
    ];

    const rowSix = [
      { key: 'CTRL', border: ['w','s'], size: 1.5 },
      { key: 'WIN', border: ['s'], size: 1 },
      { key: 'ALT', border: ['s'], size: 1.5 },
      { key: 'SPACE', border: ['s'], size: 6 },
      { key: 'ALT GR', border: ['s'], size: 1.5 },
      { key: 'WIN', border: ['s'], size: 1 },
      { key: 'Menu', border: ['s'], size: 1 },
      { key: 'CTRL', border: ['s','e'], size: 1.5 },
      { key: 'empty', size: 0.5 },
      { key: '←', border: ['n','w','s'], size: 1 },
      { key: '↓', border: ['s'], size: 1 },
      { key: '↓', border: ['n','e','s'], size: 1 },
      { key: 'empty', size: 0.5 },
      { key: '0', border: ['w','s'], size: 2 },
      { key: 'Del', border: ['s'], size: 1 },
      { key: ' ', border: ['e','s'], size: 1, style: { borderTop: 'none' } },
    ];

    const rowStyle = {
      display: 'inline-flex'
    }

    return(
      <div>
        <div style={{ marginLeft: '470px'}}>
          <KeyboardButton
            border={['n','w','e','s']}
            content={this.props.cue}
            visible={this.props.cue && !this.props.cueOnKbd}
            onClick={this.props.onClick}
          />
        </div>
        <div style={rowStyle}>
          {_.map(rowOne, (key, index) => { return this.mapKeyboardKeys(1, index + 1, key)})}
        </div>
        <div style={{ height: '30px' }}></div>
        <div style={rowStyle}>
          {_.map(rowTwo, (key, index) => { return this.mapKeyboardKeys(2, index + 1, key)})}
        </div>
        <div style={rowStyle}>
          {_.map(rowThree, (key, index) => { return this.mapKeyboardKeys(3, index + 1, key)})}
        </div>
        <div style={rowStyle}>
          {_.map(rowFour, (key, index) => { return this.mapKeyboardKeys(4, index + 1, key)})}
        </div>
        <div style={rowStyle}>
          {_.map(rowFive, (key, index) => { return this.mapKeyboardKeys(5, index + 1, key)})}
        </div>
        <div style={rowStyle}>
          {_.map(rowSix, (key, index) => { return this.mapKeyboardKeys(6, index + 1, key)})}
        </div>
      </div>
    );
  }
}
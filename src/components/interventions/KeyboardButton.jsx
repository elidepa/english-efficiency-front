import React, { Component } from 'react';
import _ from 'lodash';

export default class KeyboardButton extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if(this.props.onClick) {
      this.props.onClick({
        x: event.screenX,
        y: event.screenY,
        time: Math.floor(performance.now()),
        key: this.props.content
      })
    }
  }

  render() {
    let btnStyle = {
      width: (this.props.size ? this.props.size * 60 : 60) + 'px',
      height: '60px',
      visibility: this.props.visible ? 'visible' : 'hidden',
      border: '1px solid black'
    }

    _.forEach(this.props.border, (border) => {
      switch (border) {
      case 'n': {
        btnStyle.borderTop = '2px solid black';
        break;
      }
      case 'w': {
        btnStyle.borderLeft = '2px solid black';
        break;
      }
      case 'e': {
        btnStyle.borderRight = '2px solid black';
        break;
      }
      case 's': {
        btnStyle.borderBottom= '2px solid black';
        break;
      }
      }
    });

    if (this.props.style) {
      btnStyle = _.merge({}, btnStyle, this.props.style);
    }

    const contentStyle = {
      paddingLeft: '3px',
      fontWeight: 'bold',
      fontSize: '18px',
      userSelect: 'none'
    }

    return(
      <div 
        style={btnStyle}
        onClick={this.onClick}
      >
        <div style={contentStyle}>
          {this.props.content}
        </div>
      </div>
    )
  }
}
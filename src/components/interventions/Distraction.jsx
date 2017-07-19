import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class Distraction extends Component {
  render() {
    const style = {
      width: '45px',
      height: '45px',
      backgroundColor: '#ffffff',
      outline: '2px solid #d3d3d3',
      marginBottom: '10px',
      visibility: this.props.visible? 'visible' : 'hidden'
    }
    return(
      <div>
        {
          <div style={style}></div>
        }
      </div>
    )
  }
}
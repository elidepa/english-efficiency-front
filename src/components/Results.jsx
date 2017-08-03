import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchResults } from '../actions/result_actions'

import { Container, Table, Dimmer, Loader, Button } from 'semantic-ui-react'

class Results extends Component {

  componentWillMount() {
    this.props.fetchResults();
  }

  render() {
    if (this.props.isFetching) {
      return(
        <Container>
          <Dimmer active inverted>
            <Loader size='huge' inverted inline='centered'>Loading</Loader>
          </Dimmer>
        </Container>
      )
    } else if (this.props.results) {

      const sessionDates = _.map(this.props.results, (session) => {
        if (session.results.tErrorRate && session.results.wpm) {
          const dateString = (new Date(session.date)).toLocaleDateString()
          return <Table.HeaderCell key={session.date}>{dateString}</Table.HeaderCell>;
        }
        return null;
      });

      const wpmRow = _.map(this.props.results, (session) => {
        if (session.results.tErrorRate && session.results.wpm) {
          return <Table.Cell key={`wpm-${session.date}`}>{Math.floor(session.results.wpm)}</Table.Cell>;
        }
        return null;
      });

      const tErrorRow = _.map(this.props.results, (session) => {
        if (session.results.tErrorRate && session.results.wpm) {
          return <Table.Cell key={`error-${session.date}`}>{`${(session.results.tErrorRate * 100).toFixed(2)}%`}</Table.Cell>;
        }
        return null;
      });

      return(
        <div className='margin-top-250'>
          <Container>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Session Date</Table.HeaderCell>
                  {sessionDates}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Words Per Minute</Table.Cell>
                  {wpmRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Error Rate</Table.Cell>
                  {tErrorRow}
                </Table.Row>
              </Table.Body>
            </Table>
          </Container>
        </div>
      )
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchResults }, dispatch);
}

const mapStateToProps = state => {
  const { isFetching, results, error } = state.userResults
  return {
    isFetching,
    results: results ? results.sessions : null,
    error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)
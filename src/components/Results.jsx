import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchResults } from '../actions/result_actions'

import { Container, Table, Dimmer, Loader, Button, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router'

class Results extends Component {
  constructor() {
    super();
    this.state = {
      redirect: undefined
    }
  }

  componentWillMount() {
    this.props.fetchResults();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

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
        if (!session.results.tErrorRate) {
          const dateString = (new Date(session.date)).toLocaleDateString()
          return <Table.HeaderCell key={session.date}>{dateString}</Table.HeaderCell>
        }
      })

      const testDates = _.map(this.props.results, (session) => {
        if (session.results.tErrorRate && session.results.wpm) {
          const dateString = (new Date(session.date)).toLocaleDateString()
          return <Table.HeaderCell key={session.date}>{dateString}</Table.HeaderCell>;
        }
        return null;
      });

      // Shift of attention results

      const aWpmRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`a-wpm-${session.date}`}>{session.results.wpm ? Math.floor(session.results.wpm) : '-'}</Table.Cell>;
        }
      });

      const aErrorRateRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`a-err-${session.date}`}>{session.results.aErrorRate ? `${(session.results.aErrorRate * 100).toFixed(2)}%` : '-'}</Table.Cell>;
        }
      });

      const avgReactionTimeRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`a-reaction-${session.date}`}>{session.results.avgReactionTime ? (Math.floor(session.results.avgReactionTime) / 1000).toFixed(2) +'s' : '-'}</Table.Cell>;
        }
      });
      
      // Motor control results

      const mTrialsRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`m-trials-${session.date}`}>{session.results.mTrials  ? session.results.mTrials : '-'}</Table.Cell>;
        }
      });

      const avgIKIRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`m-iki-${session.date}`}>{session.results.avgIKI  ? (Math.floor(session.results.avgIKI) / 1000).toFixed(2) + 's' : '-'}</Table.Cell>;
        }
      });

      // Visual search results

      const vTrialsRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`v-trials-${session.date}`}>{session.results.vTrials ? session.results.vTrials : '-'}</Table.Cell>;
        }
      });

      const vErrorRateRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`v-err-${session.date}`}>{session.results.vErrorRate ? `${(session.results.vErrorRate * 100).toFixed(2)}%` : '-'}</Table.Cell>;
        }
      });

      const avgSearchTimeRow = _.map(this.props.results, (session) => {
        if (!session.results.tErrorRate) {
          return <Table.Cell key={`v-search-${session.date}`}>{session.results.avgSearchTime ? (Math.floor(session.results.avgSearchTime) / 1000).toFixed(2) + 's' : '-'}</Table.Cell>;
        }
      });

      // Typing test results

      const testWpmRow = _.map(this.props.results, (session) => {
        if (session.results.tErrorRate && session.results.wpm) {
          return <Table.Cell key={`t-wpm-${session.date}`}>{session.results.wpm ? Math.floor(session.results.wpm) : '-'}</Table.Cell>;
        }
        return null;
      });

      const tErrorRow = _.map(this.props.results, (session) => {
        if (session.results.tErrorRate && session.results.wpm) {
          return <Table.Cell key={`t-err-${session.date}`}>{`${(session.results.tErrorRate * 100).toFixed(2)}%`}</Table.Cell>;
        }
        return null;
      });

      return(
        <div className='margin-top-150'>
          <Container>
            <Header as='h1'>Results</Header>
            <Header as='h2'>Typing Tests</Header>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Test Date</Table.HeaderCell>
                  {testDates}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Words Per Minute</Table.Cell>
                  {testWpmRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Error Rate</Table.Cell>
                  {tErrorRow}
                </Table.Row>
              </Table.Body>
            </Table>
            <Header as='h2'>Training Sessions</Header>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Session Date</Table.HeaderCell>
                  {sessionDates}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={sessionDates.length + 1}><strong>Shift of Attention</strong></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Words Per Minute</Table.Cell>
                  {aWpmRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Error Rate</Table.Cell>
                  {aErrorRateRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Avg Reaction Time</Table.Cell>
                  {avgReactionTimeRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={sessionDates.length + 1}><strong>Motor Control</strong></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Average Time Between Keystrokes (Milliseconds)</Table.Cell>
                  {avgIKIRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Number of Completed Letter Pairs</Table.Cell>
                  {mTrialsRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={sessionDates.length + 1}><strong>Visual Search</strong></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Average Search Time</Table.Cell>
                  {avgSearchTimeRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Error Rate</Table.Cell>
                  {vErrorRateRow}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Total Number of Keys Clicked</Table.Cell>
                  {vTrialsRow}
                </Table.Row>
              </Table.Body>
            </Table>
            <Button onClick={() => { this.setState({redirect: 'dashboard'}) }}>Home</Button>
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
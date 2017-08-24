import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchSessionDates } from '../actions/session_actions';

import { Container, Table, Dimmer, Loader, Header, Segment } from 'semantic-ui-react';

class Overview extends Component {
  componentWillMount() {
    this.props.fetchSessionDates();
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
    }

    const errorSegment = this.props.error ? <Segment color='red'>{this.props.error}</Segment> : null;

    return(
      <div className='margin-top-150'>
        <Container>
          <Header as='h1'>Overview</Header>
          {errorSegment}
          <Table size='small' compact='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Email
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(this.props.users, (user, userIndex) => {
                return(
                  <Table.Row key={`overview-table-row-${userIndex}`}>
                    <Table.Cell>
                      {user.email}
                    </Table.Cell>
                    {_.map(user.sessions, (session, sessionIndex) => {
                      return(
                        <Table.Cell key={`overview-table-row-${userIndex}-column-${sessionIndex}`}>
                          {(new Date(session)).toLocaleDateString()}
                        </Table.Cell>
                      )
                    })}
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({fetchSessionDates}, dispatch);
}

const mapStateToProps = state => {
  const { fetching, error, users } = state.sessionDates;
  return {
    isFetching: fetching,
    error,
    users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
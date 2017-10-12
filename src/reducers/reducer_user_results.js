import _ from 'lodash';
import {
  RESULTS_FETCHING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_FAILURE,

  RESULTS_SENDING,
  RESULTS_SEND_SUCCESS
} from '../actions/action_types';

const initialState = {
  isFetching: false,
  isSending: false,
  error: null,
  results: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case RESULTS_FETCHING:
    return _.merge({}, state, { isFetching: true });
  case RESULTS_FETCH_SUCCESS:
    return _.merge({}, state, { isFetching: false, results: action.payload, error: null });
  case RESULTS_FETCH_FAILURE:
    return _.merge({}, state, { isFetching: false, error: 'Error getting results.'});
  case RESULTS_SENDING:
    return _.merge({}, state, { isSending: true })
  case RESULTS_SEND_SUCCESS:
    return _.merge({}, state, { isSending: false })
  }
  return state;
}
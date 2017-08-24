import _ from 'lodash';
import { 
  SESSIONS_FETCHING_DATES,
  SESSIONS_FETCHING_DATES_SUCCESS,
  SESSIONS_FETCHING_DATES_FAILURE
} from '../actions/action_types';

const initialState = {
  users: [],
  fetching: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SESSIONS_FETCHING_DATES: {
    return _.merge({}, state, { fetching: true, error: '' });
  }
  case SESSIONS_FETCHING_DATES_SUCCESS: {
    return _.merge({}, state, { fetching: false, users: action.payload.data, error: '' });
  }
  case SESSIONS_FETCHING_DATES_FAILURE: {
    return _.merge({}, state, { fetching: false, users: [], error: 'Could not retrieve session dates.' });
  }
  }

  return state;
}

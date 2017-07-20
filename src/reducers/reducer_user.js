import _ from 'lodash';

import { 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAILURE, 
  USER_LOGIN_FETCHING, 
  USER_LOGOUT,

  USER_REGISTER_POSTING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_RESET,

  SESSION_EXPIRED
} from '../actions/action_types';

const initialState = {
  auth: {
    isAuthenticated: localStorage.getItem('aalto-typingcourse-token') ? true : false,
    isFetching: false,
    error: null
  },
  registration: {
    isPosting: false,
    error: '',
    success: null
  },
  token: localStorage.getItem('aalto-typingcourse-token') ? localStorage.getItem('aalto-typingcourse-token') : ''
}

export default (state = initialState, action) =>  {
  switch (action.type) {
  case USER_LOGIN_SUCCESS:
    return _.merge({}, state, { auth: { isAuthenticated: true, isFetching: false, error: '' }, token: action.payload.token });
  case SESSION_EXPIRED:
    return _.merge({}, state, { auth: { isAuthenticated: false, isFetching: false, error: 'Your session has expired. Please login.' }, token: '' });
  case USER_LOGIN_FAILURE:
    return _.merge({}, state, { auth: { isAuthenticated: false, isFetching: false, error: 'Login failed. Please check your credentials.' }, token: '' });
  case USER_LOGIN_FETCHING:
    return _.merge({}, state, { auth: { isFetching: true } })
  case USER_LOGOUT:
    return _.merge({}, state, { auth: { isAuthenticated: false }, token: '' });
  case USER_REGISTER_POSTING:
    return _.merge({}, state, { registration: { isPosting: true, error: '' } });
  case USER_REGISTER_SUCCESS:
    return _.merge({}, state, { registration: { isPosting: false, error: '', success: true } })
  case USER_REGISTER_FAILURE:
    return _.merge({}, state, { registration: { isPosting: false, error: 'Something went wrong, have you already created an account?', success: false } })
  case USER_REGISTER_RESET:
    return _.merge({}, state, { registration: { isPosting: false, error: '', success: null } })
  }
  return state;
};

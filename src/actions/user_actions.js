import axios from 'axios';
import { 
  USER_LOGIN_FAILURE, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FETCHING, 
  USER_LOGOUT,

  USER_REGISTER_POSTING,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_RESET
} from './action_types';

export function userAuthenticate(credentials) {

  return dispatch => {

    dispatch({
      type: USER_LOGIN_FETCHING
    });

    const host = process.env.NODE_ENV === 'production' ? 'https://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001'    
    axios.post(`${host}/api/login`, credentials).then(response => {
      localStorage.setItem('aalto-typingcourse-token', response.data.token)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data
      });
    }).catch(error => {
      console.log(error);
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: error
      })
    })
  }
}

export function userLogout() {
  localStorage.clear('aalto-typingcourse-token');
  return {
    type: USER_LOGOUT
  }
}

export function userRegister(credentials) {
  return dispatch => {

    dispatch({
      type: USER_REGISTER_POSTING
    });

    const host = process.env.NODE_ENV === 'production' ? 'https://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001'    
    axios.post(`${host}/api/user`, credentials).then(response => {
      dispatch({
        type: USER_REGISTER_SUCCESS
      });
      dispatch({
        type: USER_REGISTER_RESET
      });
    }).catch(error => {
      console.log(error);
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: error
      });
    });

  }
}

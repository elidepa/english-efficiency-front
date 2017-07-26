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
import logger from '../logger';

export function userAuthenticate(credentials) {

  return dispatch => {

    dispatch({
      type: USER_LOGIN_FETCHING
    });

    const host = process.env.NODE_ENV === 'production' ? 'https://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001';
    logger.debug(`logging user ${credentials.email} in, host=${host}`);
    axios.post(`${host}/api/login`, credentials).then(response => {
      localStorage.setItem('aalto-typingcourse-token', response.data.token)
      logger.debug(`login successful`)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data
      });
    }).catch(err => {
      logger.error(`error logging in`);
      if (err.reponse) {
        logger.error(`got response`)
        logger.error(`response: ${err.response}`);
        logger.error(`response body: ${err.response.data}`);
        logger.error(`response status: ${err.reponse.status}`);
        logger.error(`response headers: ${err.reponse.headers}`);
      } else if (err.request) {
        logger.error(`didn't get response`);
        logger.error(`${err.request}`);
      } else {
        logger(`${err}`);
      }
      dispatch({
        type: USER_LOGIN_FAILURE,
        payload: err
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

    const host = process.env.NODE_ENV === 'production' ? 'https://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001';
    logger.debug(`creating new user ${credentials.email}, host=${host}`)
    axios.post(`${host}/api/user`, credentials).then(response => {
      logger.debug(`user created successfully`);
      dispatch({
        type: USER_REGISTER_SUCCESS
      });
      dispatch({
        type: USER_REGISTER_RESET
      });
    }).catch(error => {
      logger.error(`error creating new user`);
      if (err.reponse) {
        logger.error(`got response`)
        logger.error(`response: ${err.response}`);
        logger.error(`response body: ${err.response.data}`);
        logger.error(`response status: ${err.reponse.status}`);
        logger.error(`response headers: ${err.reponse.headers}`);
      } else if (err.request) {
        logger.error(`didn't get response`);
        logger.error(`${err.request}`);
      } else {
        logger(`${err}`);
      }
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: error
      });
    });

  }
}

import axios from 'axios';
import { 
  RESULTS_SENDING,
  RESULTS_SEND_SUCCESS,
  RESULTS_SEND_FAILURE,

  RESULTS_FETCHING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_FAILURE
} from './action_types';
import logger from '../logger';

export function sendResults(results) {
  return dispatch => {
    dispatch({
      type: RESULTS_SENDING
    });

    const host = process.env.NODE_ENV === 'production' ? 'http://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001';
    logger.debug(`posting results, host=${host}`);
    axios.post(`${host}/api/session`, results, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('aalto-typingcourse-token')}`
      }
    }).then((response) => {
      dispatch({
        type: RESULTS_SEND_SUCCESS
      });
    }).catch((err) => {
      logger.error(`error sending new results`);
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
        logger.error(`${err}`);
      }
      dispatch({
        type: RESULTS_SEND_FAILURE,
        payload: err
      });
    });
  }
}

export function fetchResults() {
  return dispatch => {
    dispatch({
      type: RESULTS_FETCHING
    });

    const host = process.env.NODE_ENV === 'production' ? 'http://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001';
    logger.debug(`fetching results, host=${host}`);
    axios.get(`${host}/api/results`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('aalto-typingcourse-token')}`
      }
    }).then((response) => {
      dispatch({
        type: RESULTS_FETCH_SUCCESS,
        payload: response.data
      })
    }).catch((err) => {
      logger.error(`error fetching results`);
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
        logger.error(`${err}`);
      }
      dispatch({
        type: RESULTS_FETCH_FAILURE,
        payload: err
      });
    })
  }
}
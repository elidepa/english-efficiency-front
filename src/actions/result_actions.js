import axios from 'axios';
import { 
  RESULTS_SENDING,
  RESULTS_SEND_SUCCESS,
  RESULTS_SEND_FAILURE,

  RESULTS_FETCHING,
  RESULTS_FETCH_SUCCESS,
  RESULTS_FETCH_FAILURE
} from './action_types';

export function sendResults(results) {
  return dispatch => {
    dispatch({
      type: RESULTS_SENDING
    });

    const host = process.env.NODE_ENV === 'production' ? 'https://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001'
    axios.post(`${host}/api/session`, results, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('aalto-typingcourse-token')}`
      }
    }).then((response) => {
      dispatch({
        type: RESULTS_SEND_SUCCESS
      });
    }).catch((err) => {
      dispatch({
        type: RESULTS_SEND_FAILURE,
        payload: err
      });
    });
  }
}
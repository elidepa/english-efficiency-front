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

    axios.post('http://localhost:3001/api/session', results, {
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
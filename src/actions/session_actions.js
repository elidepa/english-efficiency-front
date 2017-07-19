import axios from 'axios';
import { 
  SESSION_RESET, 
  SESSION_NEW, 
  SESSION_INIT, 

  SESSION_NEXT_INTERVENTION, 
  SESSION_NEXT_SECTION,

  RESULTS_PUSH_KEYSTROKES,
  RESULTS_PUSH_DISTRACTIONS,
  RESULTS_PUSH_SECTION
} from './action_types';

export function fetchSession() {
  return dispatch => {
    dispatch({
      type: SESSION_NEW
    });

    const host = process.env.NODE_ENV === 'production' ? 'https://typingcourse.research.comnet.aalto.fi/v2/api' : 'http://localhost:3001'
    return axios.get(`${host}/api/session`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('aalto-typingcourse-token')}`
      }
    }).then((response) => {
      dispatch({
        type: SESSION_INIT,
        payload: response.data
      });
    });
  }
}

export function nextIntervention() {
  return {
    type: SESSION_NEXT_INTERVENTION
  };
}

export function nextSection() {
  return {
    type: SESSION_NEXT_SECTION
  }
}

export function resetSession() {
  return {
    type: SESSION_RESET
  }
}

export function pushSection(section) {
  return {
    type: RESULTS_PUSH_SECTION,
    payload: section
  }
}

export function pushKeystrokes(keystrokes) {
  return {
    type: RESULTS_PUSH_KEYSTROKES,
    payload: keystrokes
  }
}

export function pushDistractions(distractions) {
  return {
    type: RESULTS_PUSH_DISTRACTIONS,
    payload: distractions
  }
}
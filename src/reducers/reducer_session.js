import _ from 'lodash';
import { 
  SESSION_INIT,
  SESSION_NEW, 
  SESSION_RESET, 
  SESSION_TOO_EARLY,
  
  SESSION_NEXT_INTERVENTION, 
  SESSION_NEXT_SECTION,

  RESULTS_PUSH_SECTION,
  RESULTS_PUSH_DISTRACTIONS,
  RESULTS_PUSH_KEYSTROKES,

  USER_LOGOUT
} from '../actions/action_types';

const initialState = {
  config: {
    isFetching: false,
    interventions: [],
    lastSession: false,
    error: ''
  },
  status: {
    currentIntervention: 0,
    currentSection: 0,
    sessionCompleted: false
  },
  results: {}
}

export default (state = initialState, action) =>  {
  const checkAndInitResultSections = () => {
    const { status, results } = state;
    const { currentIntervention, currentSection } = status;
    if (!results[currentIntervention].sections[currentSection]) {
      results[currentIntervention].sections[currentSection] = {};
    }
  }

  switch (action.type) {
    
  case SESSION_NEW:
    return _.merge({}, state, { 
      config: {
        isFetching: true,
        error: ''
      }
    });

  case SESSION_INIT: {
    let results = {}
    _.forEach(action.payload.interventions, (intervention, index) => {
      results[index] = {};
      results[index].type = intervention.type;
      results[index].sections = {};
    });
    return _.merge({}, state, {
      config: {
        isFetching: false, 
        lastSession: action.payload.lastSession,
        interventions: action.payload.interventions 
      },
      results
    });
  }

  case SESSION_TOO_EARLY: {
    const nextDate = new Date(action.payload.nextSession)
    return _.merge({}, state, {
      config: {
        isFetching: false,
        error: `The next session is not ready yet. Please come back after ${nextDate.toLocaleString()}.`
      }
    })
  }

  case SESSION_NEXT_INTERVENTION: {
    const nextIntervention = state.status.currentIntervention + 1;
    return _.merge({}, state, { 
      status: {
        currentSection: 0,
        currentIntervention: nextIntervention,
        sessionCompleted: state.config.interventions[nextIntervention] ? false : true
      }
    });
  }

  case SESSION_NEXT_SECTION: {
    const nextSection = state.status.currentSection + 1;
    return _.merge({}, state, {
      status: {
        currentSection: nextSection
      }
    });
  }

  case SESSION_RESET:
    return _.merge({}, initialState, { config: { error: state.config.error } });

  case RESULTS_PUSH_SECTION: {
    checkAndInitResultSections();
    const { results } = state;
    results[state.status.currentIntervention].sections[state.status.currentSection].section = action.payload
    return _.merge({}, state, { results });
  }

  case RESULTS_PUSH_KEYSTROKES: {
    checkAndInitResultSections();
    const { results } = state;
    results[state.status.currentIntervention].sections[state.status.currentSection].keystrokes = action.payload
    return _.merge({}, state, { results });
  }

  case RESULTS_PUSH_DISTRACTIONS: {
    checkAndInitResultSections();
    const { results } = state;
    results[state.status.currentIntervention].sections[state.status.currentSection].distractions = action.payload
    return _.merge({}, state, { results });
  }

  case USER_LOGOUT:
    console.log(initialState);
    return initialState;

  }
  return state;
};


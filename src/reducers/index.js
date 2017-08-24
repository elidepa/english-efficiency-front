import { combineReducers } from 'redux';

// Reducers
import user from './reducer_user';
import session from './reducer_session';
import userResults from './reducer_user_results';
import sessionDates from './reducer_session_dates';

const rootReducer = combineReducers({
    user,
    userResults,
    session,
    sessionDates
});

export default rootReducer;
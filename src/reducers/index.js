import { combineReducers } from 'redux';

// Reducers
import user from './reducer_user';
import session from './reducer_session';
import userResults from './reducer_user_results'

const rootReducer = combineReducers({
    user,
    userResults,
    session
});

export default rootReducer;
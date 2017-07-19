import { combineReducers } from 'redux';

// Reducers
import user from './reducer_user';
import session from './reducer_session';

const rootReducer = combineReducers({
    user,
    session
});

export default rootReducer;
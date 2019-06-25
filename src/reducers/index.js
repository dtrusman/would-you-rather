import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import users from './users';
import questions from './questions';
import authedUser from './authedUser';
import selectedTab from './selectedTab';

export default combineReducers({
    users,
    questions,
    authedUser,
    selectedTab,
    loadingBar: loadingBarReducer
});
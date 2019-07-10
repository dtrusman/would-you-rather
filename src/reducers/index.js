import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import users from './users';
import questions from './questions';
import authedUser from './authedUser';
import selectedTab from './selectedTab';
import route from './route';

export default combineReducers({
    users,
    questions,
    authedUser,
    selectedTab,
    route,
    loadingBar: loadingBarReducer
});
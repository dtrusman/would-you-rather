import { getInitialData } from '../utils/api';
import { receiveUsers } from '../actions/users';
import { showLoading, hideLoading } from 'react-redux-loading';

export function handleInitialDate() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(hideLoading());
            })
    }
}
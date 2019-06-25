import { SET_SELECTED_TAB } from '../actions/selectedTab';

export default function selectedTab (state = null, action) {
    switch (action.type) {
        case SET_SELECTED_TAB:
            return action.id
            
        default:
            return state
    }
}
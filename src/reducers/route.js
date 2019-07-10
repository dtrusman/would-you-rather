import { SET_ROUTE_PATH } from '../actions/route';

export default function selectedTab (state = null, action) {
    switch (action.type) {
        case SET_ROUTE_PATH:
            return action.path
            
        default:
            return state
    }
}
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';

export function setSelectedTab (id) {
    return {
        type: SET_SELECTED_TAB,
        id,
    }
}
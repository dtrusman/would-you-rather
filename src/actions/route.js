export const SET_ROUTE_PATH = 'SET_ROUTE_PATH';

export function setRoutePath (path) {
    return {
        type: SET_ROUTE_PATH,
        path,
    }
}
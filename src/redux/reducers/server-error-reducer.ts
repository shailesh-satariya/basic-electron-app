import {FETCH_RECORDS_SERVER_ERROR, NO_SERVER_ERROR, SERVER_ERROR} from "../action-types";
import {ActionTypes} from "../types";

const initialState: boolean = false;

/**
 * @function ServerErrorReducer
 *
 * @param {boolean} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {boolean} - New state.
 */
const ServerErrorReducer = (state: boolean = initialState, action: ActionTypes): boolean => {
    switch (action.type) {
        case FETCH_RECORDS_SERVER_ERROR:
        case SERVER_ERROR:
            return true;
        case NO_SERVER_ERROR:
            return false;
        default:
            return state;
    }
};

export default ServerErrorReducer;

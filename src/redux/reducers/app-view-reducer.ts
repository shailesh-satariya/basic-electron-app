import {SET_APP_VIEW} from "../action-types";
import {ActionTypes} from "../types";
import {AppView} from "../../types";

/**
 * @function AppViewReducer
 *
 * @param {AppView} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {AppView} - New state.
 */
const AppViewReducer = (state: AppView = AppView.HOME, action: ActionTypes): AppView => {
    switch (action.type) {
        case SET_APP_VIEW:
            return action.payload;
        default:
            return state;
    }
};

export default AppViewReducer;

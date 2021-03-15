import {FETCH_RECORDS, FETCH_RECORDS_SERVER_ERROR, FETCH_RECORDS_SUCCESS} from "../action-types";
import {ActionTypes} from "../types";
import {FetchState} from "../../types";

const initialState: FetchState = FetchState.NO_STATE;

/**
 * @function FetchStateReducer
 *
 * @param {FetchState} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {FetchState} - New state.
 */
const FetchStateReducer = (state: FetchState = initialState, action: ActionTypes): FetchState => {
    switch (action.type) {
        case FETCH_RECORDS:
            return FetchState.FETCH_RECORDS;
        case FETCH_RECORDS_SERVER_ERROR:
            return FetchState.FETCH_RECORDS_SERVER_ERROR;
        case FETCH_RECORDS_SUCCESS:
            return FetchState.FETCH_RECORDS_SUCCESS;
        default:
            return state;
    }
};

export default FetchStateReducer;

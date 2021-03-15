import {RecordData} from "../../types";
import {ActionTypes} from "../types";
import {SET_RECORDS} from "../action-types";

const initialState: RecordData[] = [];

/**
 * @function RecordsReducer
 *
 * @param {RecordData[]} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {RecordData[]} - New state.
 */
const RecordsReducer = (state: RecordData[] = initialState, action: ActionTypes): RecordData[] => {
    switch (action.type) {
        case SET_RECORDS:
            return action.payload;
        default:
            return state
    }
};

export default RecordsReducer;
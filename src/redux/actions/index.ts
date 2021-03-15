import {Dispatch} from "redux";
import {AppView, RecordData} from "../../types";
import {
    FETCH_RECORDS,
    FETCH_RECORDS_SERVER_ERROR,
    FETCH_RECORDS_SUCCESS,
    NO_SERVER_ERROR,
    SET_APP_VIEW,
    SET_RECORDS,
} from "../action-types";
import * as Services from "../../services";

/**
 * Returns Redux Thunk function that dispatches SET_APP_VIEW action
 * @function setAppView
 *
 * @param {AppView} view
 *
 * @returns {function} - Redux Thunk function.
 */
export const setAppView = (view: AppView) => (dispatch: Dispatch) => {
    dispatch({type: SET_APP_VIEW, payload: view})
};

/**
 * Returns Redux Thunk function that dispatches SET_RECORDS action
 * @function setRecords
 *
 * @param {RecordData[]} records
 *
 * @returns {function} - Redux Thunk function.
 */
export const setRecords = (records: RecordData[]) => (dispatch: Dispatch) => {
    dispatch({type: SET_RECORDS, payload: records})
};

/**
 * Returns Redux Thunk function that dispatches NO_SERVER_ERROR action
 * @function setNoServerError
 *
 * @returns {function} - Redux Thunk function.
 */
export const setNoServerError = () => (dispatch: Dispatch) => {
    dispatch({type: NO_SERVER_ERROR})
};

/**
 * Dispatch axios action to fetch points
 *
 * @param {Dispatch} dispatch
 *
 * @return Promise
 */
export const fetchRecordsDispatch = (dispatch: Dispatch): Promise<any> => {
    const addRecordsFn = (records: RecordData[]): void => {
        dispatch({
            type: FETCH_RECORDS_SUCCESS
        });

        // @ts-ignore
        dispatch(setRecords(records));
    };

    dispatch({
        type: FETCH_RECORDS
    });

    return Services.fetchRecords().then(async (response: Response) => {
        const json: any = await response.json();
        addRecordsFn(json.records);
    }).catch(() => {
        dispatch({type: FETCH_RECORDS_SERVER_ERROR});
    });
};

/**
 * Returns Redux Thunk function that dispatches ADD_POINTS action
 *     after axios promise resolves
 * @function fetchRecords
 *
 * @returns {function} - Redux Thunk function.
 */
export const fetchRecords = () => {
    return fetchRecordsDispatch;
}

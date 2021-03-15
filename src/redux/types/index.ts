import {
    FETCH_RECORDS,
    FETCH_RECORDS_SERVER_ERROR,
    FETCH_RECORDS_SUCCESS,
    NO_SERVER_ERROR,
    SERVER_ERROR,
    SET_APP_VIEW,
    SET_RECORDS,
} from "../action-types";
import {AppView, RecordData} from "../../types";

interface DefaultAction {
    type: undefined | null;
}

interface SetAppView {
    type: typeof SET_APP_VIEW;
    payload: AppView
}

interface SetRecords {
    type: typeof SET_RECORDS;
    payload: RecordData[];
}

interface FetchRecordsAction {
    type: typeof FETCH_RECORDS;
}

interface FetchRecordsServerErrorAction {
    type: typeof FETCH_RECORDS_SERVER_ERROR;
}

interface FetchRecordsSuccessAction {
    type: typeof FETCH_RECORDS_SUCCESS;
}

interface ServerError {
    type: typeof SERVER_ERROR;
}

interface NoServerError {
    type: typeof NO_SERVER_ERROR;
}

export type ActionTypes =
    | DefaultAction
    | SetAppView
    | SetRecords
    | FetchRecordsAction
    | FetchRecordsServerErrorAction
    | FetchRecordsSuccessAction
    | ServerError
    | NoServerError;

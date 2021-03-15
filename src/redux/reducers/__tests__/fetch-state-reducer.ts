import {FETCH_RECORDS, FETCH_RECORDS_SERVER_ERROR, FETCH_RECORDS_SUCCESS} from "../../action-types";
import FetchStateReducer from "../fetch-state-reducer";
import {FetchState} from "../../../types";
import recordsList from "../../../test/data.json";

test("returns default initial state of `false` when no action is passed", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {type: undefined});
    expect(newState).toBe(FetchState.NO_STATE);
});

test("returns state of `FetchState.FETCH_RECORDS` upon receiving an action of type `FETCH_RECORDS`", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {type: FETCH_RECORDS});
    expect(newState).toBe(FetchState.FETCH_RECORDS);
});

test("returns state of `FetchState.FETCH_RECORDS_SERVER_ERROR` upon receiving an action of type `FETCH_RECORDS_SERVER_ERROR`", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {type: FETCH_RECORDS_SERVER_ERROR});
    expect(newState).toBe(FetchState.FETCH_RECORDS_SERVER_ERROR);
});

test("returns state of `FetchState.FETCH_RECORDS_SUCCESS` upon receiving an action of type `FETCH_RECORDS_SUCCESS`", () => {
    const newState = FetchStateReducer(FetchState.NO_STATE, {
        type: FETCH_RECORDS_SUCCESS, payload: recordsList
    });
    expect(newState).toBe(FetchState.FETCH_RECORDS_SUCCESS);
});
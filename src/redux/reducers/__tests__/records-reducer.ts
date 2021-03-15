import {SET_RECORDS} from "../../action-types";
import RecordsReducer from "../records-reducer";
import {RecordData} from "../../../types";
import recordsList from "../../../test/data.json";

test("returns default initial state of `[]` when no action is passed", () => {
    const newState = RecordsReducer([], {type: undefined});
    expect(newState).toEqual([]);
});

test("returns state of array of records upon receiving an action of type `SET_RECORDS`", () => {
    const records: RecordData[] = recordsList;
    const newState = RecordsReducer([], {
        type: SET_RECORDS,
        payload: [...records],
    });
    expect(newState).toEqual(records);
});

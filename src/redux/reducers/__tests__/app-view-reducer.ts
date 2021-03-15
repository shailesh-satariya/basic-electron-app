import {SET_APP_VIEW} from "../../action-types";
import AppViewReducer from "../app-view-reducer";
import {AppView} from "../../../types";

test("returns default initial state of `AppView.HOME` when no action is passed", () => {
    const newState = AppViewReducer(AppView.HOME, {type: undefined});
    expect(newState).toBe(AppView.HOME);
});

test("returns state of `AppView.STATISTICS` upon receiving an action of type `SET_APP_VIEW`", () => {
    const newState = AppViewReducer(AppView.HOME, {type: SET_APP_VIEW, payload: AppView.STATISTICS});
    expect(newState).toBe(AppView.STATISTICS);
});
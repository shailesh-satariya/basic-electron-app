import {combineReducers} from "redux";
import AppViewReducer from "./app-view-reducer";
import FetchStateReducer from "./fetch-state-reducer";
import RecordsReducer from "./records-reducer";
import ServerErrorReducer from "./server-error-reducer";

export default combineReducers({
    appView: AppViewReducer,
    fetchState: FetchStateReducer,
    records: RecordsReducer,
    serverError: ServerErrorReducer,
});

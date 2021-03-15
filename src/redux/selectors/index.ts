import {RootState} from "../store";

export const getAppView = (state: RootState) => state.appView;
export const getFetchState = (state: RootState) => state.fetchState;
export const getRecords = (state: RootState) => state.records;
export const hasServerError = (state: RootState) => state.serverError;

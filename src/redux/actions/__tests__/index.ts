import {Store} from "redux";
import fetchMock from "jest-fetch-mock";
import {fetchRecords} from "..";
import * as Services from "../../../services";

import {ActionTypes} from "../../types";
import {RootState} from "../../store";
import {storeFactory} from "../../../test/utils";
import {RecordData} from "../../../types";
import recordsList from "../../../test/data.json";

describe("fetchRecords action creator", () => {
    let store: Store<RootState, ActionTypes>;

    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.doMock();
        store = storeFactory();
    });

    test("adds response records to state", () => {
        const records: RecordData[] = recordsList;

        fetchMock.mockOnce(() => Services.fetchRecords().then(res => {
            return {
                status: 200,
                body: JSON.stringify({records: recordsList})
            };
        }));

        return store.dispatch<any>(fetchRecords()).then(() => {
            const newState = store.getState();
            expect(newState.records).toEqual(records);
        });
    });

    describe("updates serverError state to `true`", () => {
        // NOTE: there"s currently no way to simulate server nonresponse with moxios
        test("when server returns 4xx status", () => {
            fetchMock.mockOnce(() => Services.fetchRecords().then(res => {
                return {
                    status: 404,
                };
            }));

            // @ts-ignore
            return (
                store
                    .dispatch<any>(fetchRecords())
                    // @ts-ignore
                    .then(() => {
                        const newState = store.getState();
                        expect(newState.serverError).toBe(true);
                    })
            );
        });

        test("when server returns 5xx status", () => {
            fetchMock.mockOnce(() => Services.fetchRecords().then(res => {
                return {
                    status: 500,
                };
            }));

            return store.dispatch<any>(fetchRecords()).then(() => {
                const newState = store.getState();
                expect(newState.serverError).toBe(true);
            });
        });
    });
});

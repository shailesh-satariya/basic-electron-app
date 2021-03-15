import {fetchRecords} from "../record-service";
import fetchMock from "jest-fetch-mock";
import * as Services from "../index";
import recordsList from "../../test/data.json";

describe("fetchQuestions methods", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.doMock();
    });

    test("fetchQuestions without error", () => {
        fetchMock.mockOnce(() => Services.fetchRecords().then(res => {
            return {
                status: 200,
                body: JSON.stringify({records: recordsList})
            };
        }));

        return fetchRecords().then(
            async (response: Response) => {
                expect(response.status).toBe(200);
                const json: any = await response.json();
                expect(json.records).toEqual(recordsList);
            }
        );
    });
});
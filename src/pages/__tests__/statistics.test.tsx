import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {Provider} from "react-redux";
import {DefaultState, findByTestAttr, storeFactory, whenStable} from "../../test/utils";
import Statistics from "../statistics";
import {ActionTypes} from "../../redux/types";
import {RootState} from "../../redux/store";
import {Store} from "redux";
import recordList from "../../test/data.json";
import {TestCase} from "../../types";

const defaultStore: Store<RootState, ActionTypes> = storeFactory({...DefaultState, records: recordList});

/**
 * Factory function to create a ReactWrapper for the Statistics component.
 * @function setup
 *
 * @param {Store<RootState, ActionTypes>} store
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider
        store={store}><Statistics/></Provider>);
};

test("renders loader without error", async () => {
    const wrapper: ReactWrapper = setup();
    const elementLoader = findByTestAttr(wrapper, "element-loader");
    expect(elementLoader.length).toBe(1);
    await whenStable();
});


describe("render", () => {
    const testCases: TestCase[] = [
        {
            name: "statistics component",
            element: "component-statistics"
        },
        {
            name: "events element",
            element: "element-events"
        },
        {
            name: "max delay element",
            element: "element-max-delay"
        },
        {
            name: "min delay element",
            element: "element-min-delay"
        },
        {
            name: "mean delay element",
            element: "element-mean-delay"
        },
        {
            name: "total time element",
            element: "element-total-time"
        },
        {
            name: "longest sequence element",
            element: "element-longest-sequence"
        }
    ];

    for (const testCase of testCases) {
        test(`renders ${testCase.name} without an error`, async () => {
            const wrapper: ReactWrapper = setup();
            await whenStable();
            wrapper.update();
            const element = findByTestAttr(wrapper, testCase.element);
            expect(element.length).toBe(1);
        });
    }
});
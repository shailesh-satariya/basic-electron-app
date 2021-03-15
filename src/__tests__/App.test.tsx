import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {findByTestAttr, storeFactory} from "../test/utils";
import App from "../App";
import {TestCase} from "../types";
import {Provider} from "react-redux";
import {ActionTypes} from "../redux/types";
import {RootState} from "../redux/store";
import {Store} from "redux";

const defaultStore: Store<RootState, ActionTypes> = storeFactory();

/**
 * Factory function to create a ReactWrapper for the App component.
 * @function setup
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider store={store}><App/></Provider>);
};

describe("render", () => {
    const testCases: TestCase[] = [
        {
            name: 'app component',
            element: 'component-app'
        },
        {
            name: 'nav bar element',
            element: 'element-nav-bar'
        },
        {
            name: 'pages element',
            element: 'element-pages'
        },
        {
            name: 'toast container element',
            element: 'element-toast-container'
        }
    ];

    for (const testCase of testCases) {
        test(`renders ${testCase.name} without an error`, () => {
            const wrapper: ReactWrapper = setup();
            const element = findByTestAttr(wrapper, testCase.element);

            expect(element.length).toBe(1);
        });
    }
});
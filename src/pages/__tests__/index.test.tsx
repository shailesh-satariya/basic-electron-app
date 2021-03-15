import {mount, ReactWrapper} from "enzyme";
import React from "react";
import {Provider} from "react-redux";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import Pages from "../index";
import {ActionTypes} from "../../redux/types";
import {RootState} from "../../redux/store";
import {Store} from "redux";
import {AppView} from "../../types";
import recordList from "../../test/data.json";
import {SET_APP_VIEW} from "../../redux/action-types";


const defaultStore: Store<RootState, ActionTypes> = storeFactory({...DefaultState, records: recordList});

/**
 * Factory function to create a ReactWrapper for the Pages component.
 * @function setup
 *
 * @param {Store<RootState, ActionTypes>} store
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider
        store={store}><Pages/></Provider>);
};


describe("render component and elements", () => {
    const store: Store<RootState, ActionTypes> = storeFactory();
    const wrapper: ReactWrapper = setup(store);

    test("renders home when appView is AppState.HOME", () => {
        store.dispatch({type: SET_APP_VIEW, payload: AppView.HOME});

        wrapper.update();

        const elementHome = findByTestAttr(wrapper, "element-home");
        const elementStatistics = findByTestAttr(wrapper, "element-statistics");
        expect(elementHome.length).toBe(1);
        expect(elementStatistics.length).toBe(0);
    });

    test("renders home when appView is AppState.STATISTICS", () => {
        store.dispatch({type: SET_APP_VIEW, payload: AppView.STATISTICS});

        wrapper.update();

        const elementHome = findByTestAttr(wrapper, "element-home");
        const elementStatistics = findByTestAttr(wrapper, "element-statistics");
        expect(elementHome.length).toBe(0);
        expect(elementStatistics.length).toBe(1);
    });
});
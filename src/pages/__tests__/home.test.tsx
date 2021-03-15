import {mount, ReactWrapper} from "enzyme";
import React from "react";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import recordList from "../../test/data.json";
import Home from "../home";
import {ActionTypes} from "../../redux/types";
import {RootState} from "../../redux/store";
import {Store} from "redux";
import {FETCH_RECORDS, FETCH_RECORDS_SUCCESS} from "../../redux/action-types";
import {FetchState} from "../../types";

const defaultStore: Store<RootState, ActionTypes> = storeFactory();

/**
 * getRoot
 * @function
 *
 * @return {HTMLDivElement}
 */
const getRoot = (): HTMLDivElement => {
    const root: HTMLDivElement = document.createElement("div");
    root.id = "root";

    return root;
};

/**
 * Factory function to create a ReactWrapper for the Home component.
 * @function setup
 *
 * @param {Store<RootState, ActionTypes>} store
 * @param {HTMLDivElement | null} root
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore, root: HTMLDivElement | null = null): ReactWrapper => {
    return root ? mount(<Provider store={store}><Home/></Provider>, {attachTo: root}) : mount(<Provider
        store={store}><Home/></Provider>);
};

describe("render component and elements", () => {
    const store: Store<RootState, ActionTypes> = storeFactory();
    let wrapper: ReactWrapper;
    let root: HTMLDivElement;

    beforeAll(() => {
        root = getRoot();
        document.body.appendChild(root);
        wrapper = setup(store, root);
    });

    afterAll(() => {
        document.body.removeChild(root);
    });

    test("renders loader when fetchState is FetchState.FETCH_RECORDS", () => {
        store.dispatch({type: FETCH_RECORDS});

        wrapper.update();

        const elementLoader = findByTestAttr(wrapper, "element-loader");
        const componentHome = findByTestAttr(wrapper, "component-home");
        expect(elementLoader.length).toBe(1);
        expect(componentHome.length).toBe(0);
    });

    test("renders component when fetchState is not FetchState.FETCH_RECORDS", () => {
        store.dispatch({type: FETCH_RECORDS_SUCCESS, records: recordList});

        wrapper.update();

        const elementLoader = findByTestAttr(wrapper, "element-loader");
        const componentHome = findByTestAttr(wrapper, "component-home");
        expect(elementLoader.length).toBe(0);
        expect(componentHome.length).toBe(1);
    });
});


test("renders list items and delete buttons", () => {
    const root: HTMLDivElement = getRoot();
    document.body.appendChild(root);
    const store: Store<RootState, ActionTypes> = storeFactory({
        ...DefaultState,
        fetchState: FetchState.FETCH_RECORDS_SUCCESS,
        records: recordList
    });
    const wrapper: ReactWrapper = setup(store, root);

    const elementsListItem = findByTestAttr(wrapper, "element-list-item");
    const buttonsDelete = findByTestAttr(wrapper, "button-delete");
    expect(elementsListItem.length).toBe(recordList.length);
    expect(buttonsDelete.length).toBe(recordList.length);

    document.body.removeChild(root);
});

describe("delete button click", () => {
    test("changes after delete button click", () => {
        const root: HTMLDivElement = getRoot();
        document.body.appendChild(root);
        const store: Store<RootState, ActionTypes> = storeFactory({
            ...DefaultState,
            fetchState: FetchState.FETCH_RECORDS_SUCCESS,
            records: recordList
        });
        const wrapper: ReactWrapper = setup(store, root);

        let buttonsDelete = findByTestAttr(wrapper, "button-delete");
        buttonsDelete.first().simulate("click");

        // wrapper.update();

        const elementListItem = findByTestAttr(wrapper, "element-list-item");
        buttonsDelete = findByTestAttr(wrapper, "button-delete");
        expect(elementListItem.length).toBe(recordList.length - 1);
        expect(buttonsDelete.length).toBe(recordList.length - 1);

        document.body.removeChild(root);
    });

    test("delete button click event", () => {
        const useDispatchSpy = jest.spyOn(redux, "useDispatch");
        const mockDispatchFn = jest.fn();
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        const root: HTMLDivElement = getRoot();
        document.body.appendChild(root);
        const store: Store<RootState, ActionTypes> = storeFactory({
            ...DefaultState,
            fetchState: FetchState.FETCH_RECORDS_SUCCESS,
            records: recordList
        });
        const wrapper: ReactWrapper = setup(store, root);

        const buttonsDelete = findByTestAttr(wrapper, "button-delete");
        buttonsDelete.first().simulate("click");
        expect(mockDispatchFn).toHaveBeenCalledTimes(1);
        useDispatchSpy.mockClear();

        document.body.removeChild(root);
    });
});

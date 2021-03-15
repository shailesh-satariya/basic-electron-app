import {mount, ReactWrapper} from "enzyme";
import React from "react";
import * as redux from "react-redux";
import {Provider} from "react-redux";
import {DefaultState, findByTestAttr, storeFactory} from "../../test/utils";
import NavBar from "../nav-bar";
import {AppView, TestCase} from "../../types";
import {ActionTypes} from "../../redux/types";
import {RootState} from "../../redux/store";
import {Store} from "redux";
import {SET_APP_VIEW} from "../../redux/action-types";

const defaultStore: Store<RootState, ActionTypes> = storeFactory();

/**
 * Factory function to create a ReactWrapper for the NavBar component.
 * @function setup
 *
 * @return {ReactWrapper}
 */
const setup = (store: Store<RootState, ActionTypes> = defaultStore): ReactWrapper => {
    return mount(<Provider store={store}><NavBar/></Provider>);
};

describe("render", () => {
    const testCases: TestCase[] = [
        {
            name: "nav bar component",
            element: "component-nav-bar"
        },
        {
            name: "home button",
            element: "button-home"
        },
        {
            name: "state button",
            element: "button-state"
        },
        {
            name: "save button",
            element: "button-save"
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


test("save button on click", () => {
    const electron = window.require("electron");

    const wrapper: ReactWrapper = setup();
    const buttonSave = findByTestAttr(wrapper, "button-save");
    buttonSave.simulate("click");

    expect(electron.remote.dialog.showSaveDialogSync).toHaveBeenCalled();
});

describe("home button", () => {
    const store: Store<RootState, ActionTypes> = storeFactory();
    const wrapper: ReactWrapper = setup(store);

    test("home button is disabled when appView state is AppView.Home", async () => {
        store.dispatch({type: SET_APP_VIEW, payload: AppView.HOME});

        wrapper.update();
        const buttonHome = findByTestAttr(wrapper, "button-home");
        expect(buttonHome.prop("disabled")).toBe(true);
    });

    test("home button is not disabled when appView state is not AppView.Home", async () => {
        store.dispatch({type: SET_APP_VIEW, payload: AppView.STATISTICS});

        wrapper.update();
        const buttonHome = findByTestAttr(wrapper, "button-home");
        expect(buttonHome.prop("disabled")).toBe(false);
    });
});

test("home button on click", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, appView: AppView.STATISTICS});
    const wrapper: ReactWrapper = setup(store);

    const buttonHome = findByTestAttr(wrapper, "button-home");
    buttonHome.simulate("click");

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    useDispatchSpy.mockClear();
});


describe("state button", () => {
    const store: Store<RootState, ActionTypes> = storeFactory();
    const wrapper: ReactWrapper = setup(store);

    test("state button is disabled when appView state is AppView.STATISTICS", async () => {
        store.dispatch({type: SET_APP_VIEW, payload: AppView.STATISTICS});

        wrapper.update();
        const buttonState = findByTestAttr(wrapper, "button-state");
        expect(buttonState.prop("disabled")).toBe(true);
    });

    
    test("state button is not disabled when appView state is not  AppView.STATISTICS", async () => {
        store.dispatch({type: SET_APP_VIEW, payload: AppView.HOME});

        wrapper.update();
        const buttonState = findByTestAttr(wrapper, "button-state");
        expect(buttonState.prop("disabled")).toBe(false);
    });
});

/*
test("state button on click", () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);

    const store: Store<RootState, ActionTypes> = storeFactory({...DefaultState, appView: AppView.HOME});
    const wrapper: ReactWrapper = setup(store);

    const buttonState = findByTestAttr(wrapper, "button-state");
    buttonState.simulate('click');

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    useDispatchSpy.mockClear();
});
 */
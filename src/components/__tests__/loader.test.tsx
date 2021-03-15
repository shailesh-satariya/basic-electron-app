import {shallow, ShallowWrapper} from "enzyme";
import React from "react";
import {findByTestAttr} from "../../test/utils";
import Loader from "../loader";

/**
 * Factory function to create a ShallowWrapper for the Loader component.
 * @function setup
 *
 * @return {ShallowWrapper}
 */
const setup = (): ShallowWrapper => {
    return shallow(<Loader/>);
};

describe("render", () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
    });

    test("renders component without an error", () => {
        const componentLoader = findByTestAttr(wrapper, "component-loader");

        expect(componentLoader.length).toBe(1);
    });
});


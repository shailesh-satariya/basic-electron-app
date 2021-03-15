import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import Enzyme from "enzyme";
import fetchMock from "jest-fetch-mock";

Enzyme.configure({
    adapter: new EnzymeAdapter()
});

window.require = require;
fetchMock.enableMocks();
(window as any)["__react-beautiful-dnd-disable-dev-warnings"] = true;

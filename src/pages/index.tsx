import React from "react";
import {AppView} from "../types";
import {useSelector} from "react-redux";
import {getAppView} from "../redux/selectors";
import Statistics from "./statistics";
import Home from "./home";

/**
 * Pages component - renders appropriate page
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Pages: React.FC = (): JSX.Element => {
    const appView: AppView = useSelector(getAppView);

    switch (appView) {
        case AppView.STATISTICS:
            return <Statistics data-test="element-statistics"/>;
        default:
            return <Home data-test="element-home"/>;
    }
};

export default Pages;
import React from "react";
import {useDispatch} from "react-redux";
import {ToastContainer} from "react-toastify";
import {NavBar} from "./components";
import {fetchRecordsDispatch} from "./redux/actions";
import Pages from "./pages";
import "react-toastify/dist/ReactToastify.css";

/**
 * App component - renders app
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const App: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchRecordsDispatch);
    }, [dispatch]);


    return <div data-test="component-app" className="vh-100 d-flex flex-column">
        <NavBar data-test="element-nav-bar"/>
        <div className="flex-1 overflow-auto">
            <Pages data-test="element-pages"/>
        </div>
        <ToastContainer data-test="element-toast-container"/>
    </div>;
};

export default App;
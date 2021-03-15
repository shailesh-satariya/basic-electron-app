import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAppView} from "../redux/actions";
import {AppView, RecordData} from "../types";
import {getAppView, getRecords} from "../redux/selectors";
import {createJsonFile} from "../utils";
import {toast} from "react-toastify";

const electron = window.require("electron");

/**
 * NavBar component - renders nav bar
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const NavBar: React.FC = (): JSX.Element => {
    const [isNavBarCollapsed, setNavBarCollapsed] = React.useState(false);
    const appView: AppView = useSelector(getAppView);
    const records: RecordData[] = useSelector(getRecords);
    const dispatch = useDispatch();

    const onSaveClick = () => {
        const filePath: string | undefined = electron.remote.dialog.showSaveDialogSync({
            title: "Select the File Path to save",
            defaultPath: "records.json",
            buttonLabel: "Save",
            filters: [
                {
                    name: "Json files",
                    extensions: ["json"]
                }],
            properties: []
        });
        if (filePath && filePath.length) {
            createJsonFile(filePath, records).then(() => {
                toast.success("File successfully saved!", {
                    position: "bottom-right",
                    onClick: () => {
                        electron.ipcRenderer.send("show-item-in-folder", {path: filePath});
                    }
                });
            }).catch(() => {
                toast.error("File could not be saved!", {
                    position: "bottom-right"
                });
            });
        }
    };

    return (
        <nav data-test="component-nav-bar" className="navbar navbar-expand-sm navbar-light bg-light">
            <button className={"navbar-toggler" + (isNavBarCollapsed ? " collapsed" : "")} type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded={isNavBarCollapsed}
                    aria-label="Toggle navigation"
                    onClick={() => setNavBarCollapsed(!isNavBarCollapsed)}>
                <span className="navbar-toggler-icon"/>
            </button>

            <div className={"collapse navbar-collapse" + (isNavBarCollapsed ? "" : " show")}
                 id="navbarSupportedContent">
                <button data-test="button-home" className="btn btn-primary m-1"
                        disabled={appView === AppView.HOME}
                        onClick={() => {
                            dispatch(setAppView(AppView.HOME));
                        }}>HOME
                </button>
                <button data-test="button-state" className="btn btn-primary m-1"
                        disabled={appView === AppView.STATISTICS}
                        onClick={() => {
                            dispatch(setAppView(AppView.STATISTICS));
                        }}>STATE
                </button>
                <button data-test="button-save" className="btn btn-primary m-1" onClick={onSaveClick}>SAVE</button>
            </div>
        </nav>
    );
};

export default NavBar;
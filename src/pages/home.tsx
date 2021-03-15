import React from "react";
import moment from "moment";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
    DropResult
} from "react-beautiful-dnd";
import {FetchState, RecordData} from "../types";
import {useDispatch, useSelector} from "react-redux";
import {getFetchState, getRecords} from "../redux/selectors";
import {getRecordId, getRecordValue} from "../utils";
import {setNoServerError, setRecords} from "../redux/actions";
import {toast} from "react-toastify";
import {Loader} from "../components";

/**
 * Home component - renders home page
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Home: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const records: RecordData[] = useSelector(getRecords);
    const fetchState: FetchState = useSelector(getFetchState);

    React.useEffect(() => {
        if (fetchState === FetchState.FETCH_RECORDS_SERVER_ERROR) {
            toast.error("Server error!", {
                position: "bottom-right",
                onClose: () => dispatch(setNoServerError)
            });
        }
    }, [fetchState, dispatch]);

    const onDelete = (index: number): void => {
        const copyRecords: RecordData[] = Array.from(records);
        copyRecords.splice(index, 1);

        dispatch(setRecords(copyRecords));
    };

    const onDragEnd = (result: DropResult): void => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const startIndex: number = result.source.index;
        const endIndex: number = result.destination.index;

        const copyRecords: RecordData[] = Array.from(records);
        const [removed] = copyRecords.splice(startIndex, 1);
        copyRecords.splice(endIndex, 0, removed);

        dispatch(setRecords(copyRecords));
    };

    if (fetchState === FetchState.FETCH_RECORDS) {
        return <Loader data-test="element-loader"/>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} data-test="component-home">
            <Droppable droppableId="droppable">
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <ul className="list-group" {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {
                            records.map((record: RecordData, index: number) => (
                                <Draggable key={getRecordId(record)} draggableId={getRecordId(record)} index={index}>
                                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                        <li data-test="element-list-item"
                                            className="list-group-item list-group-item-action"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>
                                            <div className="d-flex w-100 justify-content-between">
                                                <div>
                                                    <h5 className="mb-1">{record.event.type}</h5>
                                                    <p>{getRecordValue(record)}</p>
                                                </div>
                                                <div>
                                                    <small>{moment(record.time).format("MMMM Do YYYY, h:mm:ss a")}</small>
                                                    <div className="text-right">
                                                        <button data-test="button-delete"
                                                                className="btn btn-danger btn-xs"
                                                                onClick={() => onDelete(index)}>DELETE
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))
                        }
                        {provided.placeholder}
                    </ul>)}
            </Droppable>
        </DragDropContext>);
};

export default Home;
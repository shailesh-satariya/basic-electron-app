import React from "react";
import {RecordData, RecordStatistics} from "../types";
import {useSelector} from "react-redux";
import {getRecords} from "../redux/selectors";
import {Loader} from "../components";
import {getStatistics} from "../utils";

/**
 * Statistics component - renders statistics page
 * @function
 *
 * @constructor
 *
 * @return {JSX.Element}
 */
const Statistics: React.FC = (): JSX.Element => {
    const records: RecordData[] = useSelector(getRecords);
    const initStatistics: (RecordStatistics | null) = null;

    const [statistics, setStatistics] = React.useState(initStatistics);
    React.useEffect(() => {
        getStatistics(records)
            .then((s: RecordStatistics) => setStatistics(s as any));
    }, [records]);

    if (statistics === null) {
        return <Loader data-test="element-loader"/>;
    }

    const {events, meanDelay, maxDelay, minDelay, sumDelay, longSeq}: RecordStatistics = (statistics as any as RecordStatistics);

    return (
        <div data-test="component-statistics" className="card-columns p-2">
            <div data-test="element-events" className="card text-white bg-primary">
                <div className="card-header">
                    <h5 className="text-center">Events</h5>
                </div>
                <div className="card-body d-flex justify-content-center">
                    <table>
                        <tbody>
                        {
                            Object.keys(events).map((event: string, index: number) => (
                                <tr key={index}>
                                    <th className="p-2">{event}</th>
                                    <td className="p-2">{events[event]}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            <div data-test="element-max-delay" className="card text-white bg-danger">
                <div className="card-header">
                    <h5 className="text-center">Maximum delay</h5>
                </div>
                <div className="card-body text-center">
                    <span>{maxDelay} Seconds</span>
                </div>
            </div>
            <div data-test="element-min-delay" className="card text-white bg-success">
                <div className="card-header">
                    <h5 className="text-center">Minimum delay</h5>
                </div>
                <div className="card-body text-center">
                    <span>{minDelay} Seconds</span>
                </div>
            </div>
            <div data-test="element-mean-delay" className="card text-white bg-info">
                <div className="card-header">
                    <h5 className="text-center">Mean delay</h5>
                </div>
                <div className="card-body text-center">
                    <span>{Math.round(meanDelay)} Seconds</span>
                </div>
            </div>
            <div data-test="element-total-time" className="card text-white bg-warning">
                <div className="card-header">
                    <h5 className="text-center">Total time</h5>
                </div>
                <div className="card-body text-center">
                    <span>{sumDelay} Seconds</span>
                </div>
            </div>
            <div data-test="element-longest-sequence" className="card text-white bg-secondary">
                <div className="card-header">
                    <h5 className="text-center">Longest sequence</h5>
                </div>
                <div className="card-body text-center">
                    {
                        longSeq.event ?
                            <span><b>{longSeq.event}</b>: {longSeq.value}</span> :
                            <span>N/A</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default Statistics;
import {RecordData, RecordStatistics} from "../types";

const fs = window.require("fs");


/**
 * getRecordId
 * @function
 *
 * @param {RecordData} record
 *
 * @return {string}
 */
export const getRecordId = (record: RecordData): string => {
    return `${record.event.type}_${record.time}`;
};

/**
 * getRecordValue
 * @function
 *
 * @param {RecordData} record
 *
 * @return {string|null}
 */
export const getRecordValue = (record: RecordData): string | null => {
    const html: undefined | string = record?.setup?.html;
    if (html) {
        return html.substr(1, html.indexOf(" ") - 1);
    }

    const url: undefined | string = record?.setup?.url;
    if (url) {
        return url;
    }

    return null;
};

/**
 * getStatistics
 * @function
 *
 * @param {RecordData[]} records
 *
 * @return Promise<RecordStatistics>
 */
export const getStatistics = (records: RecordData[]): Promise<RecordStatistics> => {
    return new Promise((resolve) => {
        const initStatistics: RecordStatistics = {
            events: {},
            delays: [],
            minDelay: 0,
            maxDelay: 0,
            meanDelay: 0,
            sumDelay: 0,
            longSeq: {
                event: null,
                value: 0
            }
        };


        let prevType: string | null = null;
        let prevRecordData: RecordData | null = null;
        let sequence: number = 0;

        const statistics: RecordStatistics = records.sort((r1: RecordData, r2: RecordData) => r1.time - r2.time)
            .reduce((statistics: RecordStatistics, record: RecordData) => {
                const {event, time}: RecordData = record;
                const type: string = event.type;

                statistics.events[type] = statistics.events[type] ? (statistics.events[type] + 1) : 1;

                if (prevRecordData) {
                    const delay: number = time - prevRecordData.time;
                    statistics.delays.push(delay);
                    statistics.sumDelay += delay;

                    if (type !== "focus") {
                        if (prevType === null || type === prevType) {
                            sequence++;
                        } else {
                            if (sequence > statistics.longSeq.value) {
                                statistics.longSeq = {
                                    event: prevType,
                                    value: sequence
                                };
                            }
                            sequence = 0;
                        }
                        prevType = type;
                    }
                }

                prevRecordData = record;
                return statistics;
            }, initStatistics);

        statistics.maxDelay = Math.max(...statistics.delays);
        statistics.minDelay = Math.min(...statistics.delays);
        statistics.meanDelay = statistics.delays.length ? (statistics.sumDelay / statistics.delays.length) : 0;
        if (sequence > statistics.longSeq.value) {
            statistics.longSeq = {
                event: prevType,
                value: sequence
            };
        }

        resolve(statistics);
    });
};

/**
 * createJsonFile
 *
 * @function
 *
 * @param {string} fileName
 * @param {Promise<boolean>} data
 */
export const createJsonFile = (fileName: string, data: Record<string, any>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, JSON.stringify(data, null, 4), (err: NodeJS.ErrnoException): void => {
            if (err) reject(err.code);
            else resolve(true);
        });
    });
};

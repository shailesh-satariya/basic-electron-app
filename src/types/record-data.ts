import {RecordDataEvent} from "./record-data-event";

export interface RecordData {
    event: RecordDataEvent;
    setup: Record<string, any>;
    time: number;
}
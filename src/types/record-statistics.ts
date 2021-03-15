export interface RecordStatistics {
    events: {
        [key: string]: number;
    };
    delays: number[];
    minDelay: number;
    maxDelay: number;
    meanDelay: number;
    sumDelay: number;
    longSeq: {
        event: string | null;
        value: number;
    };
}
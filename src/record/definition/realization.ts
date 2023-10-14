/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Realization
 */

export type PubRecordRealizationMap = Map<string, PubRecordRealization>;

export type PubRecordRealization = {

    readonly triggerConnections: string[];
    readonly iteration?: number;
};

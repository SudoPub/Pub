/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Realization
 */

export type PubRecordRealizationMap = Map<string, PubRecordRealization>;

export type PubRecordRealizationRecord = Record<string, PubRecordRealization>;

export type PubRecordRealization = {

    readonly procedureIdentifier: string;

    readonly iteration?: number;
};

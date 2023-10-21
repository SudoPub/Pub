/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Realization
 */

export type PubRealizationOutcome = Record<string, any>;

export type PubRecordRealizationMap = Map<string, PubRecordRealizationResult>;

export type PubRecordRealizationRecord = Record<string, PubRecordRealizationResult>;

export type PubRecordRealizationResult = {

    readonly outcome: PubRealizationOutcome;
};

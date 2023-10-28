/**
 * @author WMXPY
 * @namespace Record_Definition
 * @description Connection Enrich
 */

export type PubRecordConnectionEnrichRecord =
    Record<string, PubRecordConnectionEnrich>;

export type PubRecordConnectionEnrich = {

    readonly connectionIdentifier: string;

    readonly triggerWaypoint: string;
    readonly nextWaypoint: string;
};

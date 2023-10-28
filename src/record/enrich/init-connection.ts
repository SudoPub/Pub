/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Init Connection
 */

import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError } from "../../error/record/enrich/procedure-identifier-not-found-during-enrich";
import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";
import { PubRecordConnectionEnrich, PubRecordConnectionEnrichRecord } from "../definition/connection-enrich";
import { PubRecordProcedureEnrich, PubRecordProcedureEnrichRecord } from "../definition/procedure-enrich";
import { findNextProcedureWaypoint, findTriggerProcedureWaypoint } from "./find-procedure-waypoint";

export const recordInitEnrichConnectionRecord = (
    connections: PubConnectionConfiguration[],
    enrichProcedureRecord: PubRecordProcedureEnrichRecord,
): PubRecordConnectionEnrichRecord => {

    const record: PubRecordConnectionEnrichRecord = {};

    for (const connection of connections) {

        const enrich: PubRecordConnectionEnrich =
            recordInitEnrichConnection(connection, enrichProcedureRecord);

        record[enrich.connectionIdentifier] = enrich;
    }
    return record;
};

export const recordInitEnrichConnection = (
    connection: PubConnectionConfiguration,
    enrichProcedureRecord: PubRecordProcedureEnrichRecord,
): PubRecordConnectionEnrich => {

    const triggerEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE> | undefined =
        enrichProcedureRecord[connection.triggerProcedureIdentifier];

    if (!triggerEnrich) {
        throw PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError.create(connection.triggerProcedureIdentifier);
    }

    const triggerWaypoint: string = findTriggerProcedureWaypoint(
        connection,
        triggerEnrich,
    );

    const nextEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE> | undefined =
        enrichProcedureRecord[connection.nextProcedureIdentifier];

    if (!nextEnrich) {
        throw PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError.create(connection.nextProcedureIdentifier);
    }

    const nextWaypoint: string = findNextProcedureWaypoint(
        connection,
        nextEnrich,
    );

    return {

        connectionIdentifier: connection.identifier,

        triggerWaypoint,
        nextWaypoint,
    };
};

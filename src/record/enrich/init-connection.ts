/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Init Connection
 */

import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError } from "../../error/record/enrich/procedure-identifier-not-found-during-enrich";
import { PUB_PROCEDURE_TYPE } from "../../procedure/definition/configuration";
import { PubRecordConnectionEnrich, PubRecordConnectionEnrichMap } from "../definition/connection-enrich";
import { PubRecordProcedureEnrich, PubRecordProcedureEnrichMap } from "../definition/procedure-enrich";
import { findNextProcedureWaypoint, findTriggerProcedureWaypoint } from "./find-procedure-waypoint";

export const recordInitEnrichConnectionMap = (
    connections: PubConnectionConfiguration[],
    enrichProcedureMap: PubRecordProcedureEnrichMap,
): PubRecordConnectionEnrichMap => {

    const map: PubRecordConnectionEnrichMap = new Map();

    for (const connection of connections) {

        const enrich: PubRecordConnectionEnrich =
            recordInitEnrichConnection(connection, enrichProcedureMap);

        map.set(enrich.connectionIdentifier, enrich);
    }
    return map;
};

export const recordInitEnrichConnection = (
    connection: PubConnectionConfiguration,
    enrichProcedureMap: PubRecordProcedureEnrichMap,
): PubRecordConnectionEnrich => {

    const triggerEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE> | undefined =
        enrichProcedureMap.get(connection.triggerProcedureIdentifier);

    if (!triggerEnrich) {
        throw PubRecordEnrichProcedureIdentifierNotFoundDuringEnrichError.create(connection.triggerProcedureIdentifier);
    }

    const triggerWaypoint: string = findTriggerProcedureWaypoint(
        connection,
        triggerEnrich,
    );

    const nextEnrich: PubRecordProcedureEnrich<PUB_PROCEDURE_TYPE> | undefined =
        enrichProcedureMap.get(connection.nextProcedureIdentifier);

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

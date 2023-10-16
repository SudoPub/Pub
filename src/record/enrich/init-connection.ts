/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Init Connection
 */

import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { generateIdentifier } from "../../util/identifier";
import { PubRecordConnectionEnrich, PubRecordConnectionEnrichMap } from "../definition/connection-enrich";
import { PubRecordProcedureEnrich, PubRecordProcedureEnrichMap } from "../definition/procedure-enrich";

export const recordInitEnrichProcedureMap = (
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

    const triggerEnrich: PubRecordProcedureEnrich<any> | undefined =
        enrichProcedureMap.get(connection.triggerProcedureIdentifier);

    const nextEnrich: PubRecordProcedureEnrich<any> | undefined =
        enrichProcedureMap.get(connection.nextProcedureIdentifier);

    return {

        connectionIdentifier: connection.identifier,

        triggerWaypoint: triggerEnrich ? triggerEnrich.exitWaypoint : generateIdentifier(),
        nextWaypoint: nextEnrich ? nextEnrich.enterWaypoint : generateIdentifier(),
    };
};

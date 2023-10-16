/**
 * @author WMXPY
 * @namespace Record_Enrich
 * @description Init Connection
 */

import { PubConnectionConfiguration } from "../../connection/definition/configuration";
import { generateIdentifier } from "../../util/identifier";
import { PubRecordConnectionEnrich, PubRecordConnectionEnrichMap } from "../definition/connection-enrich";

export const recordInitEnrichProcedureMap = (
    connections: PubConnectionConfiguration[],
): PubRecordConnectionEnrichMap => {

    const map: PubRecordConnectionEnrichMap = new Map();

    for (const connection of connections) {

        const enrich: PubRecordConnectionEnrich = recordInitEnrichConnection(connection);

        map.set(enrich.connectionIdentifier, enrich);
    }
    return map;
};

export const recordInitEnrichConnection = (
    connection: PubConnectionConfiguration,
): PubRecordConnectionEnrich => {

    return {

        connectionIdentifier: connection.identifier,

        triggerWaypoint: generateIdentifier(),
        nextWaypoint: generateIdentifier(),
    };
};

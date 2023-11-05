/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Next Operation
 */

import { PUB_CONNECTION_WAYPOINT_TYPE, PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";

export type FindNextOperationItem = {

    readonly procedure: PubProcedureConfiguration;
    readonly connection: PubConnectionConfiguration;
};

export const findNextOperations = (
    currentProcedure: PubProcedureConfiguration,
    configuration: PubCachedWorkflowConfiguration,
): FindNextOperationItem[] => {

    const triggerConnections = configuration.configuration.connections
        .filter((connection) => {

            return connection.triggerProcedureIdentifier ===
                currentProcedure.identifier
                && connection.triggerProcedureWaypointType ===
                PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END;
        });

    const nextProcedures: FindNextOperationItem[] = triggerConnections
        .filter((connection) => {
            return connection.nextProcedureWaypointType ===
                PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START;
        })
        .map((connection) => {
            return {
                procedure: configuration.getProcedureByIdentifier(connection.nextProcedureIdentifier),
                connection,
            };
        })
        .filter((resolvableItem) => {
            return resolvableItem.procedure.exists;
        })
        .map((resolvableItem) => {
            return {
                procedure: resolvableItem.procedure.getOrThrow(),
                connection: resolvableItem.connection,
            };
        });

    return nextProcedures;
};

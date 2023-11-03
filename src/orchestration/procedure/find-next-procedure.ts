/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Next Procedure
 */

import { PUB_CONNECTION_WAYPOINT_TYPE } from "../../connection/definition/configuration";
import { PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { PubCachedWorkflowConfiguration } from "../../workflow/cache/configuration";

export const findNextProcedures = (
    currentProcedure: PubProcedureConfiguration,
    configuration: PubCachedWorkflowConfiguration,
): PubProcedureConfiguration[] => {

    const triggerConnections = configuration.configuration.connections
        .filter((connection) => {

            return connection.triggerProcedureIdentifier ===
                currentProcedure.identifier
                && connection.triggerProcedureWaypointType ===
                PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_END;
        });

    const nextProcedures: PubProcedureConfiguration[] = triggerConnections
        .filter((connection) => {
            return connection.nextProcedureWaypointType ===
                PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START;
        })
        .map((connection) => {
            return configuration.getProcedureByIdentifier(connection.nextProcedureIdentifier);
        })
        .filter((procedure): procedure is PubProcedureConfiguration => {
            return Boolean(procedure);
        });

    return nextProcedures;
};

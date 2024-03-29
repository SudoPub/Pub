/**
 * @author WMXPY
 * @namespace Orchestration_Procedure
 * @description Find Next Procedure
 */

import { Optional } from "@sudoo/optional";
import { PUB_CONNECTION_WAYPOINT_TYPE, PubProcedureConfiguration } from "@sudopub/essential";
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
        .filter((procedure): procedure is Optional<PubProcedureConfiguration> => {
            return procedure.exists;
        })
        .map((procedure) => procedure.getOrThrow());

    return nextProcedures;
};

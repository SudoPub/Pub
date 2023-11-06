/**
 * @author WMXPY
 * @namespace Task_Resolve
 * @description Resolve Map Espial
 */

import { Optional } from "@sudoo/optional";
import { PUB_CONNECTION_WAYPOINT_TYPE, PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { TaskExecuteInput } from "../definition/task";
import { PubMapEspialTask } from "../implementation/map-espial";
import { PubTaskManager } from "../task-manager";

export const resolveMapEspialTask = (
    task: PubMapEspialTask,
    taskManager: PubTaskManager,
): boolean => {

    const procedure: PubProcedureConfiguration<PUB_PROCEDURE_TYPE.MAP> = task.procedure;
    const executeInput: TaskExecuteInput = task
        .getExecuteInput()
        .getOrDefault({});

    if (!Array.isArray(
        executeInput[procedure.payload.iterationParameter]
    )) {
        return false;
    }

    const iterationProcedures: PubProcedureConfiguration[] = taskManager
        .workflowConfiguration
        .configuration
        .connections
        .filter((connection: PubConnectionConfiguration) => {
            return connection.triggerProcedureIdentifier ===
                procedure.identifier
                && connection.triggerProcedureWaypointType ===
                PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_ITERATE_START;
        })
        .filter((connection: PubConnectionConfiguration) => {
            return connection.nextProcedureWaypointType ===
                PUB_CONNECTION_WAYPOINT_TYPE.PROCEDURE_SELF_START;
        })
        .map((connection: PubConnectionConfiguration) => {
            return taskManager.workflowConfiguration.getProcedureByIdentifier(
                connection.nextProcedureIdentifier,
            );
        })
        .map((nextProcedure: Optional<PubProcedureConfiguration>) => {
            return nextProcedure.getOrThrow();
        });

    console.log(iterationProcedures);

    return true;
};

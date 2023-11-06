/**
 * @author WMXPY
 * @namespace Task_Resolve
 * @description Resolve Map Espial
 */

import { createPubAction } from "../../action/create";
import { PUB_ACTION_TYPE } from "../../action/definition/action";
import { PubAction_MapEspialSucceed_Iteration } from "../../action/definition/map-espial-succeed";
import { PUB_CONNECTION_WAYPOINT_TYPE, PubConnectionConfiguration } from "../../connection/definition/configuration";
import { PUB_PROCEDURE_TYPE, PubProcedureConfiguration } from "../../procedure/definition/configuration";
import { applyActionOnTaskManager } from "../apply/apply";
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

    console.log(executeInput[procedure.payload.iterationParameter]);

    const iterationProcedures: PubAction_MapEspialSucceed_Iteration[] = taskManager
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
            return {
                procedure: taskManager.workflowConfiguration.getProcedureByIdentifier(
                    connection.nextProcedureIdentifier,
                ),
                connection,
                input: task.getExecuteInput().getOrThrow(),
            };
        })
        .map((iteration) => {
            return {
                connection: iteration.connection,
                procedure: iteration.procedure.getOrThrow(),
            };
        });

    const applyResult: boolean = applyActionOnTaskManager(
        createPubAction(PUB_ACTION_TYPE.MAP_ESPIAL_SUCCEED, {

            taskIdentifier: task.taskIdentifier,

            iterations: iterationProcedures,
            input: task.getExecuteInput().getOrThrow(),
        }),
        taskManager,
    );

    return applyResult;
};

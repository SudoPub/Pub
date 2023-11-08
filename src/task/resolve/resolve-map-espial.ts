/**
 * @author WMXPY
 * @namespace Task_Resolve
 * @description Resolve Map Espial
 */

import { PUB_ACTION_TYPE, PubAction_MapEspialSucceed_Iteration, createPubAction } from "@sudopub/essential";
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

    const executeParameters: string = executeInput[procedure.payload.iterationParameter];
    if (!Array.isArray(executeParameters)) {
        return false;
    }

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

    let applyResult: boolean = true;

    for (const executeParameter of executeParameters) {

        const iterationApplyResult = applyActionOnTaskManager(
            createPubAction(PUB_ACTION_TYPE.MAP_ESPIAL_SUCCEED, {

                taskIdentifier: task.taskIdentifier,

                iterations: iterationProcedures,
                input: {
                    [task.procedure.payload.iterationItemParameter]: executeParameter,
                },
            }),
            taskManager,
        );

        if (!iterationApplyResult) {
            applyResult = false;
            break;
        }
    }
    return applyResult;
};

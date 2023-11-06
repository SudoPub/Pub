/**
 * @author WMXPY
 * @namespace Task_Apply
 * @description Insert Task From Procedures
 */

import { Optional } from "@sudoo/optional";
import { PUB_ACTION_TYPE, PubAction } from "../../action/definition/action";
import { initializeLoadRecursiveCreateTask } from "../../orchestration/initialize/recursive-create-task";
import { PubTaskBase } from "../task-base";
import { PubTaskManager } from "../task-manager";

export const applyInsertTaskFromProceduresOnTaskManager = (
    action: PubAction<PUB_ACTION_TYPE.INSERT_TASK_FROM_PROCEDURES>,
    taskManager: PubTaskManager,
): boolean => {

    const taskProcedureMap: Map<string, PubTaskBase> = new Map();

    for (const procedure of action.payload.procedures) {

        initializeLoadRecursiveCreateTask(
            taskProcedureMap,
            taskManager.workflowConfiguration,
            procedure,
            Optional.ofEmpty(),
        );
    }

    console.log(taskProcedureMap);

    return true;
};

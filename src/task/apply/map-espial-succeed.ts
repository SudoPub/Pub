/**
 * @author WMXPY
 * @namespace Task_Apply
 * @description Insert Task From Procedures
 */

import { PUB_ACTION_TYPE, PubAction } from "../../action/definition/action";
import { mapEspialInsertCreateTasks } from "../../orchestration/map-espial-insert/create-task";
import { PUB_TASK_STATUS } from "../definition/task";
import { PubMapEspialTask } from "../implementation/map-espial";
import { PubMapFinalizeTask } from "../implementation/map-finalize";
import { PubTaskBase } from "../task-base";
import { PubTaskManager } from "../task-manager";

export const applyMapEspialSucceedOnTaskManager = (
    action: PubAction<PUB_ACTION_TYPE.MAP_ESPIAL_SUCCEED>,
    taskManager: PubTaskManager,
): boolean => {

    const mapEspialTask: PubMapEspialTask = taskManager
        .getTaskByIdentifier(action.payload.taskIdentifier)
        .getOrThrow() as PubMapEspialTask;

    const mapFinalizeTask: PubMapFinalizeTask = mapEspialTask.convertToFinalize();

    for (const iteration of action.payload.iterations) {

        const tasks: PubTaskBase[] = mapEspialInsertCreateTasks(
            taskManager.workflowConfiguration,
            iteration,
            mapFinalizeTask,
        );

        taskManager.insertTasks(tasks);
    }

    taskManager.insertTasks([mapFinalizeTask]);

    mapEspialTask.setTaskStatus(PUB_TASK_STATUS.RESOLVED);

    const dependents: PubTaskBase[] = taskManager.getTasksByDependency(mapEspialTask.taskIdentifier);

    for (const dependent of dependents) {

        dependent.reconnectDependency(
            mapEspialTask.taskIdentifier,
            [mapFinalizeTask.taskIdentifier],
        );
    }
    return true;
};
